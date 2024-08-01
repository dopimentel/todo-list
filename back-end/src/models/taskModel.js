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
    return { id, description, check: false };
    };

const updateTask = async ({ id, description, check }) => {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE tasks SET description = ?, "check" = ? WHERE id = ?`,
            [description, check, id],
            function (err) {
                if (err) {
                    return reject(err);
                }
                const updatedTask = { id, description, check };
                resolve({updatedTask, affectedRows: this.changes}); // this.changes contains the number of rows affected
            }
        );
    });
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
