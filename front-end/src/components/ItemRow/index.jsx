import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Edit, Delete, Cancel, Check } from '@mui/icons-material';
import TaskContext from '../../context/taskContext';

const TaskRowContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: white;
  margin: 10px 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (min-width: 768px) {
    padding: 15px;
  }
`;

const TaskCheckbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
  @media (min-width: 768px)
  margin-right: 20px;
`;

const TaskText = styled.span`
  flex: 1.5;
  font-size: 1rem;
  text-decoration: ${({ check }) => (check ? 'line-through' : 'none')};
`;

const TaskInput = styled.input`
  flex: 1;
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

function ItemRow({ id, description, check }) {
  const [editMode, setEditMode] = useState(false);
  const [inputDescription, setInputDescription] = useState(description);

  const { toggleCheck, removeTask } = useContext(TaskContext);

  const editHandle = ({ target: { value } }) => setInputDescription(value);

  const editSave = async () => {
    toggleCheck({ id, description: inputDescription, check: !check });
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
              <IconButton
                onClick={ () => setEditMode(false) }
              >
                <Cancel />
              </IconButton>
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
              <IconButton
                onClick={ () => removeTask(id) }
              >
                <Delete />
              </IconButton>
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
};

export default ItemRow;
