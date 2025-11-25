'use client';

import { useEffect, useState } from 'react';
import { Note } from '@/lib/types';
import Postit from './Postit';

interface PostitBoardProps {
  target: 'yejin' | 'sungeun';
}

export default function PostitBoard({ target }: PostitBoardProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotes() {
      try {
        setLoading(true);
        const response = await fetch(`/api/notes?to=${target}`);

        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }

        const data = await response.json();
        setNotes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, [target]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center text-red-600">
          <p className="text-xl mb-2">⚠️</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center text-gray-500">
          <p className="text-4xl mb-4">📝</p>
          <p className="text-lg">No messages yet.</p>
          <p className="text-sm">Be the first to leave a message!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[600px] sm:min-h-[800px] bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg overflow-hidden">
      {notes.map((note) => (
        <Postit key={note.id} note={note} />
      ))}
    </div>
  );
}
