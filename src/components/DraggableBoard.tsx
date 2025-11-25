'use client';

import { useEffect, useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Note } from '@/lib/types';
import DraggablePostit from './DraggablePostit';

interface DraggableBoardProps {
  target: 'yejin' | 'sungeun';
}

export default function DraggableBoard({ target }: DraggableBoardProps) {
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    // Update note position locally
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id.toString() === active.id) {
          // Convert pixel delta to percentage (approximate)
          const containerWidth = 1000; // Approximate container width
          const containerHeight = 800;
          const deltaXPercent = (delta.x / containerWidth) * 100;
          const deltaYPercent = (delta.y / containerHeight) * 100;

          return {
            ...note,
            pos_x: Math.max(0, Math.min(80, note.pos_x + deltaXPercent)),
            pos_y: Math.max(0, Math.min(80, note.pos_y + deltaYPercent)),
          };
        }
        return note;
      })
    );

    // TODO: Optionally persist to database via PATCH /api/notes/:id endpoint
  };

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
    <DndContext onDragEnd={handleDragEnd}>
      <div className="relative w-full min-h-[600px] sm:min-h-[800px] bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg overflow-hidden">
        {notes.map((note) => (
          <DraggablePostit key={note.id} note={note} />
        ))}
      </div>
    </DndContext>
  );
}
