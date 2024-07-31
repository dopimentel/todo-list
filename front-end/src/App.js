// import logo from './logo.svg';
import './App.css';
import { TaskProvider } from './context/taskContext';
import ItemFilter from './components/ItemFilter';
import ItemAdd from './components/ItemAdd';
import ItemList from './components/ItemList';
import styled from 'styled-components';

import { createGlobalStyle } from 'styled-components';

  

const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #faedd9;
  }
`

function App() {
  const Title = styled.h1`
  text-transform: uppercase;
  transform: scale(1, 1.1);
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 12px;
  color: #2a5c0b;
  `;
  return (
    <TaskProvider>
      <>
      <GlobalStyle/>
        <Title>
        <h1>To Do List</h1>
        </Title>
        
        <ItemFilter />
        <ItemAdd />
        <ItemList />
      </>
    </TaskProvider>
  );
}

export default App;
