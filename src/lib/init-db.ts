/**
 * Database initialization script
 * Run this once after setting up Vercel Postgres to create the notes table
 *
 * Usage:
 * 1. Set up environment variables in .env.local
 * 2. Run: npx tsx src/lib/init-db.ts
 */

import { createNotesTable } from './db';

async function initDatabase() {
  try {
    console.log('Creating notes table...');
    await createNotesTable();
    console.log('✅ Database initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();
