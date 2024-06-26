const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // For in-memory database

// Uncomment the following line to use a file-based database
// const db = new sqlite3.Database('database.db');

db.serialize(() => {
  // Create Posts table
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
  )`);

  // Create Comments table
  db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    comment TEXT NOT NULL,
    FOREIGN KEY(post_id) REFERENCES posts(id)
  )`);
});

module.exports = db;
