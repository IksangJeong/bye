import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getNotes, createNote } from '@/lib/db';

const NoteSchema = z.object({
  target: z.enum(['yejin', 'sungeun']),
  author: z.string().min(1).max(50),
  message: z.string().min(5).max(500),
  color: z.enum(['yellow', 'pink', 'blue', 'green', 'purple', 'orange']),
});

// Rate limiting store (in-memory, simple implementation)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [now]);
    return true;
  }

  const timestamps = rateLimitMap.get(ip)!;
  const recentRequests = timestamps.filter(time => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    return false;
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const target = searchParams.get('to');

    if (!target || (target !== 'yejin' && target !== 'sungeun')) {
      return NextResponse.json(
        { error: 'Invalid target. Use ?to=yejin or ?to=sungeun' },
        { status: 400 }
      );
    }

    const notes = await getNotes(target);
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = NoteSchema.parse(body);

    const note = await createNote(validatedData);

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
