import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import TaskContext from '../../context/taskContext';

const AddTaskContainer = styled.div`
  display: flex;
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

const AddButton = styled.button`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: ${({ theme }) => theme.primaryColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
  }
`;

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
        placeholder="Add a new task"
      />
      <AddButton onClick={ handleAddTask }>Add</AddButton>
    </AddTaskContainer>
  );
}

export default ItemAdd;
