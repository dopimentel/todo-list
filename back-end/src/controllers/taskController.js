const taskModel = require('../models/taskModel');

const getAllTasks = async (_req, res) => {
    try {
        const tasks = await taskModel.getAllTasks();
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { description } = req.body;
        if (!description) {
            return res.status(400).json({ message: 'Description is required' });
        }
        await taskModel.createTask(description);
        res.status(201).json({ message: 'Task created successfully' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = { getAllTasks, createTask };


