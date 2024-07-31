import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import TaskContext from '../../context/taskContext';
import ItemRow from '../ItemRow';

const TaskListContainer = styled.ul`
  margin: 10px;
  @media (min-width: 768px) {
    margin: 20px;
  }
`;

function ItemList() {
  const { filteredTasks } = useContext(TaskContext);

  useEffect(() => {
    console.log('tasks:', filteredTasks);
  });

  return (
    <TaskListContainer>
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
    </TaskListContainer>
  );
}

export default ItemList;
