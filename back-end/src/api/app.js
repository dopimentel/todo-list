const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const tasksController = require('../controllers/taskController');

app.use(cors());
app.use(express.json());

app.use(morgan('tiny'));

app.get("/tasks", tasksController.getAllTasks);

module.exports = app;
