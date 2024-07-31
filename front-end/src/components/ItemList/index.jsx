import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import TaskContext from '../../context/taskContext';
import ItemRow from '../ItemRow';

const TaskListContainer = styled.ul`
  /* list-style: none; */
  /* margin: 5px;
  @media (min-width: 768px) {
    margin: 10px;
  } */
  display: flex;
  flex-direction: column;
  gap: 10px;  /* Espaçamento entre os itens */
  width: 100%;
  background-color: ${({ theme }) => theme.secondaryColor};
  /* @media (min-width: 768px) {
    gap: 20px;
    margin-right: 20px;
    margin-left: 20px;
  } */
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
