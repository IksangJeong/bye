import { type ClassValue, clsx } from 'clsx';

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
