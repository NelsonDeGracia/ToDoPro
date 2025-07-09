// app/(drawer)/_layout.tsx
//este codigo lo que hace es definir un layout de tipo Drawer utilizando Expo Router.
// El Drawer permite navegar entre diferentes pantallas de la aplicación, como las Tabs y el perfil del usuario.
// El layout envuelve las pantallas de la aplicación y proporciona una navegación lateral que se puede abrir y cerrar.
// El DrawerLayout contiene dos pantallas: una para las Tabs y otra para el perfil del usuario.
// Puedes agregar más pantallas de configuración dentro del Drawer si es necesario. 
import { Drawer } from 'expo-router/drawer'
import React from 'react'

export default function DrawerLayout() {
  return (
    // Declaramos un Drawer que envolverá nuestras Tabs
    <Drawer screenOptions={{ headerShown: false }}>
      {/* name="tabs" → carga app/(tabs)/_layout.tsx */}
      <Drawer.Screen name="tabs" options={{ title: 'Inicio' }} />
      {/* name="profile" → carga app/(tabs)/profile.tsx */}
      <Drawer.Screen name="profile" options={{ title: 'Perfil' }} />
      {/* Puedes agregar más pantallas de configuración aquí */}
    </Drawer>
  )
}
