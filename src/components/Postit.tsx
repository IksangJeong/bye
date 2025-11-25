'use client';

import { Note } from '@/lib/types';
import { COLORS } from '@/lib/utils';

interface PostitProps {
  note: Note;
  isDragging?: boolean;
}

export default function Postit({ note, isDragging = false }: PostitProps) {
  const colorClass = COLORS[note.color] || COLORS.yellow;

  return (
    <div
      className={`
        absolute p-4 w-40 sm:w-48 min-h-[160px] sm:min-h-[180px]
        ${colorClass}
        shadow-md hover:shadow-lg
        transition-all duration-200
        cursor-grab active:cursor-grabbing
        ${isDragging ? 'scale-105 shadow-2xl z-50' : ''}
      `}
      style={{
        left: `${note.pos_x}%`,
        top: `${note.pos_y}%`,
        transform: `rotate(${note.rotation}deg) ${isDragging ? 'scale(1.05)' : ''}`,
      }}
    >
      <div className="flex flex-col h-full">
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
