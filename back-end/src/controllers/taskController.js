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



module.exports = { getAllTasks };


