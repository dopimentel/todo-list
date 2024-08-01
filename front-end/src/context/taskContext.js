import { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import tasksApi from '../utils/fetch';

const SUCCESS_STATUS = 200;
const NO_CONTENT_STATUS = 204;
const NOT_FOUND_STATUS = 404;

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });

  const [error, setError] = useState('');

  const saveTasks = (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const [filter, setFilter] = useState(() => {
    const savedFilter = localStorage.getItem('filter');
    if (savedFilter) {
      return savedFilter;
    }
    return 'all';
  });
  const getTasks = useCallback(async () => {
    try {
      const { data } = await tasksApi('GET', '/tasks');
      setTasks(data);
      saveTasks(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const addTask = useCallback(async (description) => {
    try {
      await tasksApi('POST', '/tasks', { description });
      await getTasks();
    } catch (err) {
      console.error(err);
    }
  }, [getTasks]);

  const toggleCheck = useCallback(async (t) => {
    const { id, description, check } = t;
    const updatedTask = {
      id,
      description,
      check: !check,
    };
    try {
      const response = await tasksApi('PUT', `/tasks/${id}`, updatedTask);
      if (response.status === SUCCESS_STATUS) {
        const newTasks = tasks.map((task) => {
          if (task.id === id) {
            return updatedTask;
          }
          return task;
        });
        setTasks(newTasks);
        saveTasks(newTasks);
      }
    } catch (err) {
      console.error(err);
      if (err.response.status === NOT_FOUND_STATUS) {
        console.log('Task not found');
        getTasks();
      }
    }
  }, [tasks, getTasks]);

  const removeTask = useCallback(async (id) => {
    try {
      const response = await tasksApi('DELETE', `/tasks/${id}`);
      if (response.status === NO_CONTENT_STATUS) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
        saveTasks(newTasks);
      }
    } catch (err) {
      console.error(err);
      if (err.response.status === NOT_FOUND_STATUS) {
        console.log('Task not found');
        getTasks();
        saveTasks(tasks);
      }
    }
  }, [tasks, getTasks]);

  const saveFilter = (newFilter) => {
    localStorage.setItem('filter', newFilter);
  };

  const filteredTasks = useMemo(() => {
    if (tasks) {
      return tasks.filter((task) => {
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
    }
    return [];
  }, [tasks, filter]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await tasksApi('GET', '/tasks');
        setTasks(data);
        saveTasks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  const contextValue = useMemo(() => ({
    tasks,
    filteredTasks,
    filter,
    error,
    addTask,
    toggleCheck,
    removeTask,
    setFilter,
    setError,
  }), [
    error,
    tasks,
    filteredTasks,
    filter,
    addTask,
    toggleCheck,
    removeTask,
    setFilter,
    setError,
  ]);

  return (
    <TaskContext.Provider value={ contextValue }>
      { children }
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TaskContext;
