// app/(tabs)/_layout.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

// Layout principal con navegación por pestañas sin encabezado
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      
      {/* Pestaña de lista de tareas (index.tsx) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tareas',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" size={size} color={color} />
          )
        }}
      />

      {/* Pestaña de estadísticas (stats.tsx) */}
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Estadísticas',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bar-chart" size={size} color={color} />
          )
        }}
      />

      {/* Pestaña de perfil del usuario (profile.tsx) */}
      <Tabs.Screen
        name="profile"
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
// Este código define un layout de pestañas (Tabs) utilizando Expo Router.
// El layout contiene tres pestañas: "Tareas", "Estadísticas" y "Perfil".
// Cada pestaña tiene un ícono asociado utilizando Material Icons.
// Las pestañas están configuradas para no mostrar un encabezado (headerShown: false).  
