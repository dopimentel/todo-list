import sqlite3 from 'sqlite3';
import { join } from 'path';

const dbPath = join(__dirname, '..', 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database', err.message);
  } else {
    console.log('Connected to database');
  }
});

export default db;
