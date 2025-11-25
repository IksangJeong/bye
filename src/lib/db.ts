import { sql } from '@vercel/postgres';
import { Note } from './types';

export async function createNotesTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS notes (
      id BIGSERIAL PRIMARY KEY,
      target VARCHAR(20) NOT NULL,
      author VARCHAR(50) NOT NULL,
      message TEXT NOT NULL,
      color VARCHAR(20) NOT NULL,
      pos_x INTEGER DEFAULT 0,
      pos_y INTEGER DEFAULT 0,
      rotation INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
}

export async function getNotes(target: 'yejin' | 'sungeun'): Promise<Note[]> {
  const { rows } = await sql<Note>`
    SELECT * FROM notes
    WHERE target = ${target}
    ORDER BY created_at DESC
  `;
  return rows;
}

export async function createNote(note: {
  target: string;
  author: string;
  message: string;
  color: string;
}): Promise<Note> {
  // Generate random position and rotation
  const pos_x = Math.floor(Math.random() * 80); // 0-80% of container width
  const pos_y = Math.floor(Math.random() * 80); // 0-80% of container height
  const rotation = Math.floor(Math.random() * 7) - 3; // -3 to +3 degrees

  const { rows } = await sql<Note>`
    INSERT INTO notes (target, author, message, color, pos_x, pos_y, rotation)
    VALUES (${note.target}, ${note.author}, ${note.message}, ${note.color}, ${pos_x}, ${pos_y}, ${rotation})
    RETURNING *
  `;

  return rows[0];
}

export async function updateNotePosition(id: number, pos_x: number, pos_y: number): Promise<void> {
  await sql`
    UPDATE notes
    SET pos_x = ${pos_x}, pos_y = ${pos_y}
    WHERE id = ${id}
  `;
}
