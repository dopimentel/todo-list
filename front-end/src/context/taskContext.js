import { createContext, useEffect, useState } from "react";

const TaskContext = createContext();

export function TaskProvider ({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  }
  );

  const [filter, setFilter] = useState(() => {
    const savedFilter = localStorage.getItem('filter');
    if (savedFilter) {
      return savedFilter;
    }
    return 'all';
  }
  );

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

  const saveFilter = (filter) => {
    localStorage.setItem('filter', filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      saveFilter(filter);
      return true;
    }
    if (filter === 'checked') {
      saveFilter(filter);
      return task.check;
    }
    if (filter === 'unchecked') {
      saveFilter(filter);
      return !task.check;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


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
