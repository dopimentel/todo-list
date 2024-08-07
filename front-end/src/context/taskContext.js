/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import tasksApi from '../utils/fetch';

const SUCCESS_STATUS = 200;
const NO_CONTENT_STATUS = 204;
const CREATED_STATUS = 201;
const TIME = 2000;
const NOT_FOUND_STATUS = 404;

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      return savedTasks;
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

  const getTasks = async () => {
    try {
      const { data } = await tasksApi('GET', '/tasks');
      setTasks(data);
      saveTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async (description) => {
    try {
      const response = await tasksApi('POST', '/tasks', { description });
      if (response.status === CREATED_STATUS) {
        const newTask = response.data;
        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
        saveTasks(newTasks);
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao adicionar tarefa');
      setTimeout(
        () => {
          setError('');
        },
        TIME,
      );
    }
  };

  const toggleCheck = async ({ id, description, check }) => {
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
      setError('Erro ao atualizar tarefa');
      setTimeout(
        () => {
          setError('');
        },
        TIME,
      );
      getTasks();
    }
  };

  const removeTask = async (id) => {
    try {
      const response = await tasksApi('DELETE', `/tasks/${id}`);
      if (response.status === NO_CONTENT_STATUS) {
        getTasks();
      }
      if (response.status === NOT_FOUND_STATUS) {
        setError('Tarefa não encontrada');
        setTimeout(
          () => {
            setError('');
          },
          TIME,
        );
        getTasks();
      }
    } catch (err) {
      console.error(err);
      getTasks();
    }
  };

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
    getTasks();
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
