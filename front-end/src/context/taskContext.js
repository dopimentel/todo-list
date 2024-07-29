import { createContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider ({ children }) {
  const [tasks, setTasks] = useState([]);

  const addTask = (description) => {
    const newTask = { description, check: false };
    setTasks([ ...tasks, newTask ]);
  };
  
  const toggleCheck = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
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


  const contextValue = {
    tasks,
    addTask,
    toggleCheck,
    removeTask,
  };

  return (
    <TaskContext.Provider value={ contextValue }>
      { children }
    </TaskContext.Provider>
  );
}

export default TaskContext;
