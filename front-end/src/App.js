// import logo from './logo.svg';
import './App.css';
import { TaskProvider } from './context/taskContext';
import ItemFilter from './components/ItemFilter';
import ItemAdd from './components/ItemAdd';
import ItemList from './components/ItemList';

function App() {
  return (
    <TaskProvider>
      <div className="App">
      <h1>To Do List</h1>
      <ItemFilter />
      <ItemAdd />
      <ItemList />
      </div>
    </TaskProvider>
  );
}

export default App;
