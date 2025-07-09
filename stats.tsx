// app/(tabs)/stats.tsx
// Este archivo define una pantalla de estadísticas en una aplicación React Native utilizando Expo Router. 
// Muestra estadísticas de tareas locales y datos remotos obtenidos de una API (adviceslip.com).
// Utiliza el contexto de tareas para acceder a las tareas locales y muestra un indicador de carga mientras se obtienen los datos remotos.
// Si ocurre un error al cargar los datos remotos, muestra un mensaje de error.
// El estilo se define utilizando StyleSheet de React Native para mantener la consistencia visual en la aplicación.
// El uso de ScrollView permite que el contenido sea desplazable, lo cual es útil para pantallas con mucho contenido.
// Las estadísticas locales incluyen el total de tareas, las completadas y las pendientes.

import React, { useContext } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { COLORS, SPACING } from '../../constants/Colors';
import { TaskContext } from '../../context/TaskContext';

export default function StatsScreen() {
  const { tasks } = useContext(TaskContext);

  // Recalcular totales incluyendo canceladas y pendientes reales
  const completed = tasks.filter(t => t.completed).length;
  const canceled  = tasks.filter(t => t.canceled).length;
  const pending   = tasks.filter(t => !t.completed && !t.canceled).length;
  const total     = completed + canceled + pending;

  // Configuración de la gráfica de pastel con 3 sectores
  const chartConfig = {
    type: 'pie',
    data: {
      labels: ['Completadas', 'Pendientes', 'Canceladas'],
      datasets: [{
        data: [completed, pending, canceled],
        backgroundColor: [
          COLORS.primary,   // Completadas
          COLORS.secondary, // Pendientes
          COLORS.error      // Canceladas
        ]
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  };

  // URL para QuickChart.io con la configuración de la gráfica
  // QuickChart.io es un servicio que permite generar gráficos a partir de configuraciones JSON
  // Aquí usamos JSON.stringify para convertir la configuración del gráfico a una cadena JSON
  const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(
    JSON.stringify(chartConfig)
  )}`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>📊 Estado de tus tareas</Text>
      <View style={styles.chartContainer}>
        <Image source={{ uri: chartUrl }} style={styles.chartImage} />
      </View>

      <View style={styles.separator} />

      <Text style={styles.statText}>Total de tareas:      {total}</Text>
      <Text style={styles.statText}>Completadas:         {completed}</Text>
      <Text style={styles.statText}>Pendientes:          {pending}</Text>
      <Text style={styles.statText}>Canceladas:          {canceled}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    alignItems: 'center'
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 18,
    marginBottom: SPACING.lg
  },
  chartContainer: {
    width: '50%',
    alignItems: 'center'
  },
  chartImage: {
    width: '50%',
    height: 250
  },
  separator: {
    height: SPACING.lg
  },
  statText: {
    fontSize: 14,
    marginBottom: SPACING.xs,
    color: COLORS.text
  }
});
