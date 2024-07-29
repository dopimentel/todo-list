import { createContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider ({ children }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (description) => {
    const newTask = { description, check: false };
    setTasks([ ...tasks, newTask ]);
  };
  
  const toggleCheck = (description) => {
    const updatedTasks = tasks.map((task) => {
      if (task.description === description) {
        return { ...task, check: !task.check };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    }
    if (filter === 'checked') {
      return task.check;
    }
    if (filter === 'unchecked') {
      return !task.check;
    }
    return true;
  });


  const contextValue = {
    tasks: filteredTasks,
    filter,
    addTask,
    toggleCheck,
    removeTask,
    setFilter,

  };

  return (
    <TaskContext.Provider value={ contextValue }>
      { children }
    </TaskContext.Provider>
  );
}

export default TaskContext;
