import React, { useContext, useState } from 'react';
import TaskContext from '../../context/taskContext';

function ItemRow({ id, description, check }) {
  const [editMode, setEditMode] = useState(false)
  const [inputDescription, setInputDescription] = useState(description);

  const { toggleCheck , removeTask } = useContext(TaskContext);

  const editHandle = ({ target: { value } }) => 
    setInputDescription(value);

  const editSave = async () => {
    toggleCheck({ id, description: inputDescription, check: !check });
    setEditMode(false);
    };

  return (
    <>
      <div>
        { editMode ?
          (
            <>
              <div>
                <input
                  value={inputDescription} 
                  onChange={editHandle} 
                />
              </div>
              <div>
                <button 
                  onClick={editSave}
                >Salvar</button>
                <button
                  onClick={()=>setEditMode(false)}
                >Fechar</button>
              </div>
            </>
          ) :
          (
            <>
              <input
                type="checkbox"
                checked={ check }
                onChange={ () => toggleCheck({ id, description, check }) }
              />
              <div 
              >{description}</div>
              <div >
                <button
                  onClick={()=>setEditMode(true)}
                >Editar</button>
                <button
                  onClick={()=>removeTask(id)}
                >Remover</button>
              </div>
            </>
          )
        }
      </div>
    </>
  );
}

export default ItemRow;
