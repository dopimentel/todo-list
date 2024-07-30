const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '..', 'database.db');

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
      db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY,
          description TEXT NOT NULL,
          "check" INTEGER NOT NULL
          );`, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    });
}

module.exports = { db, createTable };