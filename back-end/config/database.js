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

function createTable() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        description TEXT NOT NULL,
        check BOOLEAN NOT NULL DEFAULT 0
      )`, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    });
}

export default db;
export { createTable };
