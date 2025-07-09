// app/_layout.tsx
// este codigo lo que hace es definir el layout raíz de la aplicación utilizando Expo Router.
// El layout envuelve toda la aplicación y proporciona un contexto global para manejar las tareas a través
// del `TaskProvider`. El `Slot` es donde se renderizarán las pantallas
// específicas de la aplicación, permitiendo que el DrawerLayout funcione correctamente.
// Este enfoque permite que todas las pantallas de la aplicación tengan acceso al contexto de tareas,
// facilitando la gestión del estado de las tareas en toda la aplicación.
import { Slot } from 'expo-router'
import React from 'react'
import { TaskProvider } from '../context/TaskContext'

export default function RootLayout() {
  // 1) TaskProvider: estado global
  // 2) Slot: arranca el DrawerLayout de app/(drawer)/_layout.tsx
  return (
    <TaskProvider>
      <Slot />
    </TaskProvider>
  )
}
