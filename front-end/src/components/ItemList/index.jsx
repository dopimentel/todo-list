import React, { useContext, useEffect } from 'react';
import TaskContext from '../../context/taskContext';
import ItemRow from '../ItemRow';

function ItemList() {
  const { filteredTasks } = useContext(TaskContext);

  useEffect(() => {
    console.log('tasks:', filteredTasks);
  });

  return (
    <ul>
      { filteredTasks
        .length > 0 && filteredTasks
        .map(({ id, description, check }, index) => (
          <ItemRow
            key={ `${index}` }
            id={ id }
            description={ description }
            check={ check }
          />
        )) }
    </ul>
  );
}

export default ItemList;
