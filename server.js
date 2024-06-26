const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Route to create a new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const sql = `INSERT INTO posts (title, content) VALUES (?, ?)`;
  db.run(sql, [title, content], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(`Post Successfully Added.`);
  });
});

// Route to post a comment to a specific post
app.post('/posts/:postId/comments', (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;
  const sql = `INSERT INTO comments (post_id, comment) VALUES (?, ?)`;
  db.run(sql, [postId, comment], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(`Comment succesfully added to postId ${postId}`);
  });
});

// Route to get all comments for a specific post
app.get('/posts/:postId/comments', (req, res) => {
  const { postId } = req.params;
  const sql = `SELECT * FROM comments WHERE post_id = ?`;
  db.all(sql, [postId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ comments: rows });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
