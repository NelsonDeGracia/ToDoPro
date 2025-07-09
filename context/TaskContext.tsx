// context/TaskContext.tsx
// este codigo lo que hace es crear un contexto de React para manejar las tareas de una aplicación de lista de tareas (To-Do List).
// Permite añadir, actualizar, eliminar y marcar tareas como completadas, así como limpiar todas las tareas.
// Utiliza AsyncStorage para persistir los datos entre sesiones, de modo que las tareas se  mantengan incluso si la aplicación 
// se cierra o se reinicia.
// El contexto se crea con `createContext` y se provee a través de un `TaskProvider` que envuelve a los componentes hijos.
// El `TaskProvider` maneja el estado de las tareas y proporciona funciones para interactuar  con ellas, como añadir una nueva 
// tarea, actualizar una existente, eliminar una tarea específica, alternar el estado de completado de una tarea y limpiar todas las tareas.

import React, { createContext, useEffect, useState } from 'react';
import { loadData, saveData } from '../utils';

export type Category = 'Universidad' | 'Trabajo' | 'Hogar';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  canceled: boolean;
  createdAt: Date; 
  category: Category; // campo para categoría: 'Universidad', 'Trabajo', 'Hogar'
  dueDate: string;  //campo para fecha de vencimiento: 'YYYY-MM-DD'
  dueTime: string;  //campo para hora de vencimiento: 'HH:MM'
}

interface TaskContextProps {
  tasks: Task[];
  addTask: (data: Omit<Task, 'id' | 'createdAt' | 'canceled'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleCompleted: (id: string) => void;
  toggleCanceled: (id: string) => void;
  clearAllTasks: () => Promise<void>;
}

export const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  toggleCompleted: () => {},
  toggleCanceled: () => {},
  clearAllTasks: async () => {},
});

export const TaskProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await loadData<Task[]>('TASKS');
      if (stored) {
        setTasks(stored.map(t => ({
          ...t,
          createdAt: new Date(t.createdAt)
        })));
      }
    })();
  }, []);

  useEffect(() => {
    saveData('TASKS', tasks);
  }, [tasks]);

  const addTask = (data: Omit<Task, 'id' | 'createdAt' | 'canceled'>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      createdAt: new Date(),
      canceled: false,
      ...data
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (updated: Task) => {
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleCompleted = (id: string) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const toggleCanceled = (id: string) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, canceled: !t.canceled } : t
    ));
  };

  const clearAllTasks = async () => {
    setTasks([]);
    await saveData('TASKS', []);
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      toggleCompleted,
      toggleCanceled,
      clearAllTasks,
    }}>
      {children}
    </TaskContext.Provider>
  );
};

