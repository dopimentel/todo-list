import React, { useContext, useEffect } from 'react';
import TaskContext from '../../context/taskContext';


function ItemList() {
    const { filteredTasks, toggleCheck, removeTask } = useContext(TaskContext);

    useEffect(() => {
        console.log('tasks:', filteredTasks);
    },);

    return (
        <ul>
            { filteredTasks.length > 0 && filteredTasks.map((task, index) => (
                <li key={ index }>
                    <input
                        type="checkbox"
                        checked={ task.check }
                        onChange={ () => toggleCheck(task.description) }
                    />
                    { task.description }

                    <button onClick={ () => removeTask(task.id) }>Remove</button>
                </li>
            )) }
        </ul>
    );
};

export default ItemList;