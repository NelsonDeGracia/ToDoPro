// app/(tabs)/_layout.tsx
import { MaterialIcons } from '@expo/vector-icons';
// Importa íconos de Material Design para usar en la barra de navegación

import { Tabs } from 'expo-router';
// Importa el componente de navegación por pestañas de expo-router

import React from 'react';
// Importa React

export default function TabsLayout() {
  return (
    // Contenedor de las pestañas, sin encabezado
    <Tabs screenOptions={{ headerShown: false }}>
      
      {/* Pestaña principal: Lista de tareas */}
      <Tabs.Screen
        name="index" // Corresponde a index.tsx en la carpeta
        options={{
          title: 'Tareas', // Nombre visible en la pestaña
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" size={size} color={color} />
          ) // Ícono de lista
        }}
      />

      {/* Pestaña de estadísticas */}
      <Tabs.Screen
        name="stats" // Corresponde a stats.tsx
        options={{
          title: 'Estadísticas',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bar-chart" size={size} color={color} />
          ) // Ícono de gráfico
        }}
      />

      {/* Pestaña del perfil del usuario */}
      <Tabs.Screen
        name="profile" // Corresponde a profile.tsx
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ) // Ícono de usuario
        }}
      />
    </Tabs>
  );
}

// Este código define un layout de pestañas (Tabs) utilizando Expo Router.
// El layout contiene tres pestañas: "Tareas", "Estadísticas" y "Perfil".
// Cada pestaña tiene un ícono asociado utilizando Material Icons.
// Las pestañas están configuradas para no mostrar un encabezado (headerShown: false).  
