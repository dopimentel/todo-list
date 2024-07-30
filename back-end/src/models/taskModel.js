const { db } = require('../config/database');
const getAllTasks = async () => {
    const tasks = await db.all('SELECT * FROM tasks');
    return tasks;
    };


module.exports = { getAllTasks };
