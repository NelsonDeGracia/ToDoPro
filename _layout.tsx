// app/(tabs)/_layout.tsx
// Este archivo define la estructura de navegación por pestañas (bottom tabs) usando Expo Router.

// -------------------- IMPORTACIONES --------------------

import { MaterialIcons } from '@expo/vector-icons'; // Íconos de Material Design para las pestañas
import { Tabs } from 'expo-router';                 // Componente Tabs que permite navegación por pestañas
import React from 'react';                          // Importación estándar de React

// -------------------- COMPONENTE DE LAYOUT DE PESTAÑAS --------------------

export default function TabsLayout() {
  return (
    // El componente Tabs crea una navegación tipo "Bottom Tab Navigator"
    <Tabs
      screenOptions={{
        headerShown: false // Oculta la cabecera superior en cada pantalla
      }}
    >
      {/* ---------- PESTAÑA: LISTA DE TAREAS (index.tsx) ---------- */}
      <Tabs.Screen
        name="index" // Corresponde al archivo app/(tabs)/index.tsx
        options={{
          title: 'Tareas', // Texto que se muestra debajo del ícono
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" size={size} color={color} />
          )
        }}
      />

      {/* ---------- PESTAÑA: ESTADÍSTICAS (stats.tsx) ---------- */}
      <Tabs.Screen
        name="stats" // Corresponde al archivo app/(tabs)/stats.tsx
        options={{
          title: 'Estadísticas',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bar-chart" size={size} color={color} />
          )
        }}
      />

      {/* ---------- PESTAÑA: PERFIL DEL USUARIO (profile.tsx) ---------- */}
      <Tabs.Screen
        name="profile" // Corresponde al archivo app/(tabs)/profile.tsx
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  );
}

/*
RESUMEN:
Este componente representa el diseño de navegación inferior de la app.
Cada pestaña está asociada a una ruta específica y tiene su ícono correspondiente:
  - index.tsx      → "Tareas"      → icono: list
  - stats.tsx      → "Estadísticas"→ icono: bar-chart
  - profile.tsx    → "Perfil"      → icono: person

Se utiliza el sistema de rutas anidadas de Expo Router, y se oculta el encabezado superior
para lograr una apariencia limpia en cada pestaña.
*/
