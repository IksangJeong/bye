'use client';

import { Note } from '@/lib/types';
import { COLORS, getSizeClasses } from '@/lib/utils';

interface PostitProps {
  note: Note;
  totalCount: number;
  isDragging?: boolean;
}

export default function Postit({ note, totalCount, isDragging = false }: PostitProps) {
  const colorClass = COLORS[note.color] || COLORS.yellow;
  const sizeClasses = getSizeClasses(totalCount);

  return (
    <div
      className={`
        absolute p-3 ${sizeClasses.container}
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
        <p className={`${sizeClasses.text} text-gray-800 mb-2 flex-grow whitespace-pre-wrap break-words line-clamp-6`}>
          {note.message}
        </p>
        <div className={`${sizeClasses.author} text-gray-600 font-medium text-right mt-auto`}>
          - {note.author}
        </div>
      </div>
    </div>
  );
}
