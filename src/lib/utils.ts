import { type ClassValue, clsx } from 'clsx';
import { Note } from './types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const COLORS = {
  yellow: 'bg-yellow-200 hover:bg-yellow-300',
  pink: 'bg-pink-200 hover:bg-pink-300',
  blue: 'bg-blue-200 hover:bg-blue-300',
  green: 'bg-green-200 hover:bg-green-300',
  purple: 'bg-purple-200 hover:bg-purple-300',
  orange: 'bg-orange-200 hover:bg-orange-300',
} as const;

export type ColorKey = keyof typeof COLORS;

/**
 * Get size classes based on total note count
 */
export function getSizeClasses(count: number) {
  if (count <= 10) {
    return {
      container: 'w-48 sm:w-48 min-h-[180px]',
      text: 'text-sm sm:text-base',
      author: 'text-xs',
    };
  }
  if (count <= 25) {
    return {
      container: 'w-40 sm:w-44 min-h-[160px]',
      text: 'text-xs sm:text-sm',
      author: 'text-[10px]',
    };
  }
  if (count <= 50) {
    return {
      container: 'w-32 sm:w-36 min-h-[128px]',
      text: 'text-xs',
      author: 'text-[10px]',
    };
  }
  if (count <= 100) {
    return {
      container: 'w-28 sm:w-32 min-h-[112px]',
      text: 'text-[11px]',
      author: 'text-[9px]',
    };
  }
  return {
    container: 'w-24 sm:w-28 min-h-[96px]',
    text: 'text-[10px]',
    author: 'text-[8px]',
  };
}

/**
 * Rearrange notes to avoid overlaps using grid-based layout
 */
export function rearrangeNotes(notes: Note[]): Note[] {
  if (notes.length === 0) return notes;

  // Calculate optimal grid size with more spacing
  const gridSize = Math.ceil(Math.sqrt(notes.length * 1.5)); // 50% extra space for better distribution
  const cellWidth = 85 / gridSize; // Use 85% to leave adequate margins
  const cellHeight = 85 / gridSize;

  return notes.map((note, index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    // Position in cell center with deterministic offset based on note ID
    const centerX = col * cellWidth + cellWidth / 2 + 5; // Add 5% left margin
    const centerY = row * cellHeight + cellHeight / 2 + 5; // Add 5% top margin

    // Use note ID with better hashing for more varied positioning
    const hash1 = (note.id * 2654435761) % 1000; // Multiplicative hash
    const hash2 = (note.id * 2246822519) % 1000; // Different hash for Y offset

    const offsetX = ((hash1 / 1000) - 0.5) * cellWidth * 0.4;
    const offsetY = ((hash2 / 1000) - 0.5) * cellHeight * 0.4;

    const pos_x = Math.max(3, Math.min(82, centerX + offsetX));
    const pos_y = Math.max(3, Math.min(82, centerY + offsetY));

    return {
      ...note,
      pos_x,
      pos_y,
    };
  });
}
