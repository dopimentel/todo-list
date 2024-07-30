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

  const getTasks = async () => {
    try
    {
      const { data } = await tasksApi("GET", "/tasks");
      setTasks(data);
      saveTasks(data);
    }
    catch (err) {
      console.error(err);
    }
  }

  const addTask = async (description) => {
    try {
      await tasksApi("POST", "/tasks", { description });
      await getTasks();
    }
    catch (err) {
      console.error(err);
    }
  }
  
  const toggleCheck = (description) => {
    const updatedTasks = tasks.map((task) => {
      if (task.description === description) {
        return { ...task, check: !task.check };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const removeTask = async (id) => {
    try {
      await tasksApi("DELETE", `/tasks/${id}`);
      await getTasks();
    }
    catch (err) {
      console.error(err);
    }
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
        try
        {
          const { data } = await tasksApi("GET", "/tasks");
          setTasks(data);
          saveTasks(data);
        }
        catch (err) {
          console.error(err);
        }
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
