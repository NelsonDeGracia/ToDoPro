// app/(tabs)/stats.tsx
// Este archivo define una pantalla de estadísticas en una aplicación React Native utilizando Expo Router. 
// Muestra estadísticas de tareas locales y datos remotos obtenidos de una API (adviceslip.com).
// Utiliza el contexto de tareas para acceder a las tareas locales y muestra un indicador de carga mientras se obtienen los datos remotos.
// Si ocurre un error al cargar los datos remotos, muestra un mensaje de error.
// El estilo se define utilizando StyleSheet de React Native para mantener la consistencia visual en la aplicación.
// El uso de ScrollView permite que el contenido sea desplazable, lo cual es útil para pantallas con mucho contenido.
// Las estadísticas locales incluyen el total de tareas, las completadas y las pendientes.

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
  const { tasks } = useContext(TaskContext);

  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice')
      .then(res => {
        if (!res.ok) throw new Error(`Código ${res.status}`);
        return res.json();
      })
      .then((data: { slip: { advice: string } }) => {
        setAdvice(data.slip.advice);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const total     = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending   = total - completed;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>💡 Consejo del día:</Text>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text style={styles.errorText}>
          No se pudo cargar el consejo: {error}
        </Text>
      ) : (
        <Text style={styles.adviceText}>“{advice}”</Text>
      )}

      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>📊 Estadísticas locales:</Text>
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
  sectionTitle: {
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    fontSize: 18,
  },
  adviceText: {
    fontStyle: 'italic',
    marginBottom: SPACING.lg,
    fontSize: 16,
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
    marginBottom: SPACING.lg,
  },
});

