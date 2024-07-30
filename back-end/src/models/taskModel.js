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

function deleteTask(id) {
    return new Promise((resolve, reject) => {
        db.run(
            'DELETE FROM tasks WHERE id = ?',
            [id],
            function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(this.changes); // this.changes contains the number of rows affected
            }
        );
    });
}

module.exports = { getAllTasks , createTask, updateTask, deleteTask };
