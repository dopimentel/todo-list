const app = require('../api/app');
const { createTable } = require('../config/database');
const PORT = process.env.PORT || 3001;

createTable()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error creating table:', err.message);
  });
