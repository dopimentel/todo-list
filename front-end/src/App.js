// import logo from './logo.svg';
import './App.css';
import { TaskProvider } from './context/taskContext';

function App() {
  return (
    <TaskProvider>
      <div className="App">
      <h1>To Do List</h1>
      </div>
    </TaskProvider>
  );
}

export default App;
