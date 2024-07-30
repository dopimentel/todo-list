const { db } = require('../config/database');
console.log(db);
const uuid = require('uuid').v4;


const getAllTasks = async () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM tasks', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const createTask = async (description) => {
    const id = uuid();
    db.run('INSERT INTO tasks (id, description) VALUES (?, ?)', id, description);
    };

const updateTask = async (id, check) => {
    db.run('UPDATE tasks SET "check" = ? WHERE id = ?', check, id);
};


module.exports = { getAllTasks , createTask, updateTask };
