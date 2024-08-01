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
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;  /* Espaçamento entre os itens */
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
  @media (min-width: 768px) {
    background-color: ${({ theme }) => theme.containerBackground};
  }
`;

function ItemList() {
  const { filteredTasks, filter } = useContext(TaskContext);

  useEffect(() => {
    console.log('tasks:', filteredTasks);
  });

  return (
    filteredTasks.length > 0 ? (
      <TaskListContainer>
        { filteredTasks
          .map(({ id, description, check }, index) => (
            <ItemRow
              key={ `${index}` }
              index={ index }
              id={ id }
              description={ description }
              check={ check }
            />
          )) }
      </TaskListContainer>
    )
      : (
        <p>
          Nenhuma tarefa.
          { filter !== 'all' ? ' Tente outro filtro.' : '' }
        </p>
      )
  );
}

export default ItemList;
