// context/TaskContext.tsx
// este codigo lo que hace es crear un contexto de React para manejar las tareas de una aplicación de lista de tareas (To-Do List).
// Permite añadir, actualizar, eliminar y marcar tareas como completadas, así como limpiar todas las tareas.
// Utiliza AsyncStorage para persistir los datos entre sesiones, de modo que las tareas se  mantengan incluso si la aplicación 
// se cierra o se reinicia.
// El contexto se crea con `createContext` y se provee a través de un `TaskProvider` que envuelve a los componentes hijos.
// El `TaskProvider` maneja el estado de las tareas y proporciona funciones para interactuar  con ellas, como añadir una nueva 
// tarea, actualizar una existente, eliminar una tarea específica, alternar el estado de completado de una tarea y limpiar todas las tareas.
import React, { createContext, useEffect, useState } from 'react';
// Importa React y hooks necesarios

import { loadData, saveData } from '../utils';
// Funciones personalizadas para cargar y guardar datos (ej: AsyncStorage)

// Definición de la estructura que debe tener una tarea
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

// Interfaz que define las funciones y datos disponibles en el contexto
interface TaskContextProps {
  tasks: Task[];
  addTask: (data: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleCompleted: (id: string) => void;
  clearAllTasks: () => Promise<void>;
}

// Crea un contexto con valores por defecto vacíos o funciones dummy
export const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  toggleCompleted: () => {},
  clearAllTasks: async () => {},
});

// Proveedor del contexto: envuelve la app y ofrece acceso a tareas
export const TaskProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]); // Estado de tareas

  // Carga tareas desde almacenamiento local al iniciar
  useEffect(() => {
    (async () => {
      const stored = await loadData<Task[]>('TASKS');
      if (stored) {
        setTasks(stored.map(t => ({ ...t, createdAt: new Date(t.createdAt) })));
      }
    })();
  }, []);

  // Guarda tareas en almacenamiento local cada vez que cambian
  useEffect(() => {
    saveData('TASKS', tasks);
  }, [tasks]);

  // Agrega una nueva tarea con id y fecha actuales
  const addTask = (data: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      createdAt: new Date(),
      ...data,
    };
    setTasks(prev => [newTask, ...prev]); // Añade al inicio de la lista
  };

  // Actualiza una tarea existente por ID
  const updateTask = (updated: Task) => {
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  // Elimina una tarea por su ID y muestra logs en consola
  const deleteTask = (id: string) => {
    console.log('🗑️ deleteTask llamado con id:', id);
    setTasks(prev => {
      const filtered = prev.filter(t => t.id !== id);
      console.log('🔄 tareas tras deleteTask:', filtered);
      return filtered;
    });
  };

  // Marca/desmarca una tarea como completada
  const toggleCompleted = (id: string) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };

  // Borra todas las tareas y limpia almacenamiento
  const clearAllTasks = async () => {
    console.log('⚠️ clearAllTasks context, tareas antes:', tasks.length);
    setTasks([]);
    await saveData('TASKS', []);
    console.log('✅ clearAllTasks context, tareas ahora:', tasks.length);
  };

  // Provee acceso al contexto y sus funciones a los componentes hijos
  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      toggleCompleted,
      clearAllTasks,
    }}>
      {children}
    </TaskContext.Provider>
  );
};
