const { db } = require('../config/database');
console.log(db);
const uuid = require('uuid').v4;


const getAllTasks = () => {
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


module.exports = { getAllTasks , createTask };
