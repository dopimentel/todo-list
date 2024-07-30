import { createContext, useEffect, useState } from "react";
import tasksApi from "../utils/fetch";
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

  const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

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

  const filteredTasks = tasks ? tasks.filter((task) => {
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
  }) : [];

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      const fetchTasks = async () => {
        const { data } = await tasksApi("GET", "/tasks");
        setTasks(data);
        saveTasks(data);
      };
      fetchTasks();
    }
  }, []);


  const contextValue = {
    tasks,
    filteredTasks,
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
