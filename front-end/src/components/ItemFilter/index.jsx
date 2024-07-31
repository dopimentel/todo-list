import React, { useContext } from 'react';
import styled from 'styled-components';
import TaskContext from '../../context/taskContext';

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  @media (min-width: 768px) {
    margin: 20px;
  }
`;

const FilterSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

function ItemFilter() {
  const { filter, setFilter } = useContext(TaskContext);

  return (
    <FilterContainer>
      <FilterSelect value={ filter } onChange={ (e) => setFilter(e.target.value) }>
        <option value="all">Todas</option>
        <option value="checked">Concluídas</option>
        <option value="unchecked">Não Concluídas</option>
      </FilterSelect>
    </FilterContainer>
  );
}

export default ItemFilter;
