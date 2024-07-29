import React, { useContext, useState } from 'react';
import TaskContext from '../../context/taskContext';

function ItemAdd() {
    const { addTask } = useContext(TaskContext);
    const [description, setDescription] = useState('');
    
    const handleAddTask = () => {
        if (!description) {
            return;
        }
        addTask(description);
        setDescription('');
    };
    
    return (
        <div>
        <input
            type="text"
            value={ description }
            onChange={ (e) => setDescription(e.target.value) }
        />
        <button onClick={ handleAddTask }>Add</button>
        </div>
    );
    }

export default ItemAdd;
