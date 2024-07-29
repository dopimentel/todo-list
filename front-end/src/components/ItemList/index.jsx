import React, { useContext, useEffect } from 'react';
import TaskContext from '../../context/taskContext';


function ItemList() {
    const { tasks, toggleCheck } = useContext(TaskContext);

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
                        onChange={ () => toggleCheck(index) }
                    />
                    { task.description }
                </li>
            )) }
        </ul>
    );
};

export default ItemList;