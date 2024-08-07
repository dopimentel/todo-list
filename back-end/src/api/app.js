const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const tasksController = require('../controllers/taskController');

app.use(cors());
app.use(express.json());

app.use(morgan('tiny'));

app.get("/tasks", tasksController.getAllTasks);
app.post("/tasks", tasksController.createTask);
app.put("/tasks/:id", tasksController.updateTask);
app.delete("/tasks/:id", tasksController.deleteTask);

module.exports = app;
