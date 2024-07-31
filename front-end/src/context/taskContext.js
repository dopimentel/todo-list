import { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import tasksApi from '../utils/fetch';

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

  const toggleCheck = useCallback(async (task) => {
    const { id, description, check } = task;
    try {
      await tasksApi('PUT', `/tasks/${id}`, { id, description, check: !check });
      await getTasks();
    } catch (err) {
      console.error(err);
      if (err.response.status === NOT_FOUND_STATUS) {
        console.log('Task not found');
        getTasks();
      }
    }
  }, [getTasks]);

  const removeTask = useCallback(async (id) => {
    try {
      await tasksApi('DELETE', `/tasks/${id}`);
      await getTasks();
    } catch (err) {
      console.error(err);
      if (err.response.status === NOT_FOUND_STATUS) {
        console.log('Task not found');
        getTasks();
      }
    }
  }, [getTasks]);

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
    addTask,
    toggleCheck,
    removeTask,
    setFilter,
  }), [tasks, filteredTasks, filter, addTask, toggleCheck, removeTask, setFilter]);

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
