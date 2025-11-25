'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Note } from '@/lib/types';
import { COLORS } from '@/lib/utils';

interface DraggablePostitProps {
  note: Note;
}

export default function DraggablePostit({ note }: DraggablePostitProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: note.id.toString(),
  });

  const colorClass = COLORS[note.color] || COLORS.yellow;

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        left: `${note.pos_x}%`,
        top: `${note.pos_y}%`,
        transform: `rotate(${note.rotation}deg) ${style?.transform || ''}`,
      }}
      {...listeners}
      {...attributes}
      className={`
        absolute p-4 w-40 sm:w-48 min-h-[160px] sm:min-h-[180px]
        ${colorClass}
        shadow-md hover:shadow-lg
        transition-shadow duration-200
        cursor-grab active:cursor-grabbing
        ${isDragging ? 'scale-105 shadow-2xl z-50 opacity-80' : ''}
      `}
    >
      <div className="flex flex-col h-full pointer-events-none">
        <p className="text-sm sm:text-base text-gray-800 mb-3 flex-grow whitespace-pre-wrap break-words">
          {note.message}
        </p>
        <div className="text-xs text-gray-600 font-medium text-right mt-auto">
          - {note.author}
        </div>
      </div>
    </div>
  );
}
