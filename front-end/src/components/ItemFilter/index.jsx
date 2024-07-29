import React, { useContext } from 'react';
import TaskContext from '../../context/taskContext';

const ItemFilter = () => {
    const { filter, setFilter } = useContext(TaskContext);

    return (
        <div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Todas</option>
                <option value="checked">Concluídas</option>
                <option value="unchecked">Não Concluídas</option>
            </select>
        </div>
    );
    };

export default ItemFilter;