// app/(tabs)/stats.tsx

import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { COLORS, SPACING } from '../../constants/Colors';
import { TaskContext } from '../../context/TaskContext';

export default function StatsScreen() {
  // Contexto de tareas
  const { tasks } = useContext(TaskContext);

  // Estados para datos remotos
  const [remoteItems, setRemoteItems] = useState<{ id: number; title: string }[]>([]);
  const [loadingRemote, setLoadingRemote] = useState(true);
  const [errorRemote, setErrorRemote] = useState<string | null>(null);

  // Petición a API al montar
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(res => {
        if (!res.ok) throw new Error(`Código ${res.status}`);
        return res.json();
      })
      .then(data => {
        const items = (data as any[]).map(item => ({
          id: item.id,
          title: item.title,
        }));
        setRemoteItems(items);
      })
      .catch(err => setErrorRemote(err.message))
      .finally(() => setLoadingRemote(false));
  }, []);

  // Estadísticas locales
  const total     = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending   = total - completed;

  // Render condicional
  if (loadingRemote) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (errorRemote) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error al cargar: {errorRemote}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Datos remotos (JSONPlaceholder):</Text>
      {remoteItems.map(item => (
        <Text key={item.id} style={styles.remoteItem}>
          • {item.title}
        </Text>
      ))}

      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>Estadísticas locales:</Text>
      <Text style={styles.statText}>Total de tareas:   {total}</Text>
      <Text style={styles.statText}>Completadas:      {completed}</Text>
      <Text style={styles.statText}>Pendientes:       {pending}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    fontSize: 18,
  },
  remoteItem: {
    marginBottom: SPACING.xs,
    fontSize: 14,
    color: COLORS.text,
  },
  separator: {
    height: SPACING.lg,
  },
  statText: {
    fontSize: 14,
    marginBottom: SPACING.xs,
    color: COLORS.text,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
  },
});
// Este código define una pantalla de estadísticas en una aplicación React Native utilizando Expo Router.
// Muestra estadísticas de tareas locales y datos remotos obtenidos de una API (JSONPlaceholder).
// Utiliza el contexto de tareas para acceder a las tareas locales y muestra un indicador de carga mientras se obtienen los datos remotos.
// Si ocurre un error al cargar los datos remotos, muestra un mensaje de error.
// El estilo se define utilizando StyleSheet de React Native para mantener la consistencia visual en la aplicación.
// El uso de ScrollView permite que el contenido sea desplazable, lo cual es útil para pantallas con mucho contenido.
// Las estadísticas locales incluyen el total de tareas, las completadas y las pendientes.
// Los datos remotos se muestran como una lista de títulos obtenidos de la API, con un límite de 5 elementos.
// El uso de useContext permite acceder al contexto de tareas y sus funciones, como obtener la lista de tareas.
// Este enfoque modular y basado en contexto facilita la gestión del estado de las tareas y la visualización de estadísticas en la aplicación.
// Además, el uso de estados locales permite manejar la carga y los errores de manera eficiente.
// El uso de constantes para colores y espaciados ayuda a mantener la consistencia visual en toda la aplicación.
// Las funciones de estilo permiten definir un diseño limpio y organizado, mejorando la experiencia del usuario al interactuar con la aplicación.
// La pantalla está diseñada para ser responsiva y fácil de usar, con un enfoque en la usabilidad y la experiencia del usuario.
// El uso de Text y View permite mostrar información de manera clara y estructurada, mientras que el uso de ActivityIndicator proporciona una retroalimentación visual durante la carga de datos.
// Este enfoque modular y basado en contexto facilita la gestión del estado de las tareas y la visualización de estadísticas en la aplicación.
// La pantalla está diseñada para ser responsiva y fácil de usar, con un enfoque en la usabilidad y la experiencia del usuario.
