import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import TaskContext from '../../context/taskContext';

const CustomIconButton = styled(IconButton)`
  background-color: #4caf50 !important;

  &:hover {
    transform: scale(1.1);
  }
`;

const AddTaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    margin: 20px;
  }
`;

const TaskInput = styled.input`
  padding: 10px;
  font-size: 16px;
  flex: 1;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

// const AddButton = styled.button`
//   padding: 10px;
//   font-size: 16px;
//   color: white;
//   background-color: ${({ theme }) => theme.primaryColor};
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     color: ${({ theme }) => theme.primaryColor};
//     background-color: ${({ theme }) => theme.containerBackground};
//     border: 1px solid ${({ theme }) => theme.primaryColor};
//   }
// `;

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
    <AddTaskContainer>
      <TaskInput
        type="text"
        value={ description }
        onChange={ (e) => setDescription(e.target.value) }
        placeholder="Adicione uma tarefa"
      />
      <CustomIconButton onClick={ handleAddTask }><Add /></CustomIconButton>
    </AddTaskContainer>
  );
}

export default ItemAdd;
