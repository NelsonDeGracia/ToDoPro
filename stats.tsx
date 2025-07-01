// Importación de librerías necesarias
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Importación de constantes de estilo personalizadas
import { COLORS, SPACING } from '../../constants/Colors';

// Importación del contexto que contiene las tareas
import { TaskContext } from '../../context/TaskContext';

export default function StatsScreen() {
  // Obtenemos las tareas desde el contexto
  const { tasks } = useContext(TaskContext);

  // Estados para almacenar datos de la API
  const [remoteItems, setRemoteItems] = useState<{ id: number; title: string }[]>([]);
  const [loadingRemote, setLoadingRemote] = useState(true);           // Estado de carga
  const [errorRemote, setErrorRemote] = useState<string | null>(null); // Estado de error

  // Hook useEffect para hacer la petición al montar el componente
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5') // Petición a API de prueba
      .then(res => {
        if (!res.ok) throw new Error(`Código ${res.status}`); // Manejo de errores HTTP
        return res.json();
      })
      .then(data => {
        // Formateamos los datos obtenidos
        const items = (data as any[]).map(item => ({
          id: item.id,
          title: item.title,
        }));
        setRemoteItems(items); // Guardamos en el estado
      })
      .catch(err => setErrorRemote(err.message)) // Si hay error, lo almacenamos
      .finally(() => setLoadingRemote(false));   // Terminamos la carga
  }, []);

  // Cálculo de estadísticas locales
  const total     = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending   = total - completed;

  // Si los datos remotos están cargando, mostramos spinner
  if (loadingRemote) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Si hubo error al cargar los datos remotos, se muestra mensaje
  if (errorRemote) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error al cargar: {errorRemote}</Text>
      </View>
    );
  }

  // Render principal cuando ya hay datos cargados
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Sección de datos remotos */}
      <Text style={styles.sectionTitle}>Datos remotos (JSONPlaceholder):</Text>
      {remoteItems.map(item => (
        <Text key={item.id} style={styles.remoteItem}>
          • {item.title}
        </Text>
      ))}

      {/* Separador visual */}
      <View style={styles.separator} />

      {/* Sección de estadísticas locales */}
      <Text style={styles.sectionTitle}>Estadísticas locales:</Text>
      <Text style={styles.statText}>Total de tareas:   {total}</Text>
      <Text style={styles.statText}>Completadas:      {completed}</Text>
      <Text style={styles.statText}>Pendientes:       {pending}</Text>
    </ScrollView>
  );
}

// Estilos para los componentes de la pantalla
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
