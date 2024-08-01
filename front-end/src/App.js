// import logo from './logo.svg';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { TaskProvider } from './context/taskContext';
import ItemFilter from './components/ItemFilter';
import ItemAdd from './components/ItemAdd';
import ItemList from './components/ItemList';
import { theme } from './styles/theme';

const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme: localTheme }) => localTheme.backgroundColor};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  background-color: ${theme.backgroundColor};
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.6);
  min-height: 100vh;

  @media (min-width: 768px) {
    width: 60%;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.6);
    border-radius: 10px;
  }
`;
const Title = styled.h1`
text-transform: uppercase;
transform: scale(1, 1.1);
font-weight: bold;
font-size: 18px;
letter-spacing: 12px;
color: ${({ theme: localTheme }) => localTheme.primaryColor};
`;

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <TaskProvider>
        <GlobalStyle />
        <Container>
          <Title>
            To Do List
          </Title>

          <ItemFilter />
          <ItemAdd />
          <ItemList />
        </Container>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
