export interface Note {
  id: number;
  target: 'yejin' | 'sungeun';
  author: string;
  message: string;
  color: 'yellow' | 'pink' | 'blue' | 'green' | 'purple' | 'orange';
  pos_x: number;
  pos_y: number;
  rotation: number;
  created_at: string;
}

export type NoteInput = Omit<Note, 'id' | 'pos_x' | 'pos_y' | 'rotation' | 'created_at'>;
