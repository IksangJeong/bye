'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Note } from '@/lib/types';
import { COLORS, getSizeClasses } from '@/lib/utils';

interface DraggablePostitProps {
  note: Note;
  totalCount: number;
}

export default function DraggablePostit({ note, totalCount }: DraggablePostitProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: note.id.toString(),
  });

  const colorClass = COLORS[note.color] || COLORS.yellow;
  const sizeClasses = getSizeClasses(totalCount);

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
        absolute p-3 ${sizeClasses.container}
        ${colorClass}
        shadow-md hover:shadow-lg
        transition-shadow duration-200
        cursor-grab active:cursor-grabbing
        ${isDragging ? 'scale-105 shadow-2xl z-50 opacity-80' : ''}
      `}
    >
      <div className="flex flex-col h-full pointer-events-none">
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
