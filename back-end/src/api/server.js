const express = require('express');
const { createTable } = require('../config/database');
const app = express();
const PORT = process.env.PORT || 3001;

createTable()
  .then(() => {
    app.use(express.json());
    app.get('/tasks', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error creating table:', err.message);
  });
