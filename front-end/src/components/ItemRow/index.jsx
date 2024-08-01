import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Edit, Delete, Cancel, Check } from '@mui/icons-material';
import TaskContext from '../../context/taskContext';

const TaskRowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  margin: 10px 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (min-width: 768px) {
    padding: 15px;
    margin-right: 2rem;
    margin-left: 2rem;
  }
`;

const TaskCheckbox = styled.input`
  appearance: none; /* Remove default appearance */
  -webkit-appearance: none; /* Remove default appearance on WebKit */
  width: 24px; /* Size of the checkbox */
  height: 24px; /* Size of the checkbox */
  border-radius: 4px; /* Rounded corners */
  background-color: ${({ checked }) => (
    checked ? '#4caf50' : '#fff'
  )}; /* Background color */
  border: 2px solid #ccc; /* Border color */
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s, border-color 0.2s;

  @media (min-width: 768px) {
    width: 28px;
    height: 28px;
  }

  &:checked {
    background-color: #4caf50; /* Checked background color */
    border-color: #4caf50; /* Border color when checked */
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 6px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    transform: translate(-50%, -50%);
    opacity: ${({ checked }) => (checked ? 1 : 0)};
    transition: opacity 0.2s;
  }

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3); /* Focus outline */
  }
`;

const TaskText = styled.span`
    flex: 1;
    font-size: 16px;  /* Tamanho da fonte */
    color: ${({ check }) => (check ? '#9e9e9e' : '#333')};  /* Cor do texto */
    text-decoration: ${({ check }) => (check ? 'line-through' : 'none')};
    font-weight: ${({ check }) => (check ? 'normal' : 'bold')};  /* Negrito */
    /* Decoração do texto */
    transition: color 0.3s, text-decoration 0.3s;  /* Transição suave */
    margin-left: 10px;  /* Espaçamento à esquerda */
    padding: 5px;  /* Espaçamento interno */
    display: flex;
    align-items: center;  /* Alinha o texto verticalmente */
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
`;

const TaskInput = styled.input`
  flex: 1;
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// const IconButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   margin-left: 10px;

//   &:hover {
//     color: ${({ theme }) => theme.primaryColor};
//     transform: scale(1.1);
//   }
// `;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
    transform: scale(1.2);
  }
`;

const IconDeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: red;
    background: white;
    transform: scale(1.2);
  }
`;

function ItemRow({ id, description, check, index }) {
  const [editMode, setEditMode] = useState(false);
  const [inputDescription, setInputDescription] = useState(description);

  const { toggleCheck, removeTask, filteredTasks } = useContext(TaskContext);

  const editHandle = ({ target: { value } }) => setInputDescription(value);

  const editSave = async () => {
    if (inputDescription === filteredTasks[index].description) {
      setEditMode(false);
      return;
    }
    toggleCheck({ id, description: inputDescription, check: !check }); // Update just the description
    setEditMode(false);
  };

  return (
    <TaskRowContainer>
      { editMode
        ? (
          <>
            <div>
              <TaskInput
                value={ inputDescription }
                onChange={ editHandle }
                placeholder="Edit task"
              />
            </div>
            <div>
              <IconButton
                onClick={ editSave }
              >
                <Check />
              </IconButton>
              <IconDeleteButton
                onClick={ () => setEditMode(false) }
              >
                <Cancel />
              </IconDeleteButton>
            </div>
          </>
        )
        : (
          <>
            <TaskCheckbox
              type="checkbox"
              checked={ check }
              onChange={ () => toggleCheck({ id, description, check }) }
            />
            <TaskText check={ check }>
              {description}
            </TaskText>
            <div>
              <IconButton
                onClick={ () => setEditMode(true) }
              >
                <Edit />
              </IconButton>
              <IconDeleteButton
                onClick={ () => removeTask(id) }
              >
                <Delete />
              </IconDeleteButton>
            </div>
          </>
        )}
    </TaskRowContainer>
  );
}

ItemRow.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  check: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default ItemRow;
