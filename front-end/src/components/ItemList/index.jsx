import React, { useContext, useEffect } from 'react';
import TaskContext from '../../context/taskContext';


function ItemList() {
    const { tasks, toggleCheck, removeTask } = useContext(TaskContext);

    useEffect(() => {
        console.log('tasks:', tasks);
    }, [tasks]);

    return (
        <ul>
            { tasks.map((task, index) => (
                <li key={ index }>
                    <input
                        type="checkbox"
                        checked={ task.check }
                        onChange={ () => toggleCheck(task.description) }
                    />
                    { task.description }

                    <button onClick={ () => removeTask(index) }>Remove</button>
                </li>
            )) }
        </ul>
    );
};

export default ItemList;