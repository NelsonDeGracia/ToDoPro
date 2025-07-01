verificar la ultima version de index
import { MaterialIcons } from '@expo/vector-icons';
// Iconos de Material Design para usar en botones

import { useRouter } from 'expo-router';
// Hook para navegación entre pantallas

import React, { useContext } from 'react';
// React y hook para acceder al contexto

import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// Componentes principales de interfaz en React Native

import { TaskContext } from '../../context/TaskContext';
// Importa el contexto de tareas

const logo = require('../../assets/images/react-logo.png');
// Carga imagen local para el logo

export default function TaskListScreen() {
  const router = useRouter(); // Navegación
  const { tasks, toggleCompleted, deleteTask } = useContext(TaskContext); // Acceso a tareas y acciones

  // Manejador para eliminar tarea
  const handleDelete = (id: string) => {
    console.log('🔵 [Index] handleDelete llamado con id:', id);

    // Confirmación distinta para web
    if (Platform.OS === 'web') {
      const ok = window.confirm('¿Seguro que deseas eliminar esta tarea?');
      console.log('🔘 [Index:web] confirm result:', ok);
      if (ok) {
        deleteTask(id);
        console.log('🟢 [Index:web] deleteTask invocado');
      }
      return;
    }

    // Confirmación para móvil (nativo)
    Alert.alert(
      'Eliminar tarea',
      '¿Seguro que deseas eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => console.log('⚪️ [Index] Canceló borrado') },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            console.log('🔴 [Index] Confirmó borrado, invocando deleteTask');
            deleteTask(id);
            console.log('🟢 [Index] deleteTask invocado');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Logo de la aplicación */}
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      {/* Botón para navegar a pantalla de agregar tarea */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add')}
      >
        <Text style={styles.addButtonText}>➕ Agregar tarea</Text>
      </TouchableOpacity>

      {/* Lista de tareas */}
      <FlatList
        data={tasks}
        keyExtractor={t => t.id}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            {/* Título de la tarea - clic para ver detalles */}
            <TouchableOpacity
              style={styles.titleContainer}
              onPress={() => router.push(`/detail/${item.id}`)}
            >
              <Text
                style={[
                  styles.taskTitle,
                  item.completed && styles.taskTitleCompleted
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>

            {/* Iconos de acciones (check y eliminar) */}
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => toggleCompleted(item.id)}>
                <Text style={styles.checkbox}>
                  {item.completed ? '✅' : '🔲'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteIcon}
              >
                <MaterialIcons name="delete" size={24} color="#D32F2F" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// Estilos para los componentes de la pantalla
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  logo: { width: 120, height: 120, alignSelf: 'center', marginBottom: 16 },
  addButton: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#1E88E5',
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  addButtonText: { color: '#fff', fontSize: 16 },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  titleContainer: { flex: 1 },
  taskTitle: { fontSize: 16, color: '#333' },
  taskTitleCompleted: { textDecorationLine: 'line-through', color: '#999' },
  iconsContainer: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { fontSize: 20, marginRight: 12 },
  deleteIcon: { padding: 4 }
});

// --- Explicación del código ---
// Este código define una pantalla de lista de tareas en una aplicación React Native utilizando Expo Router.
// Muestra un logo, un botón para agregar tareas y una lista de tareas con un checkbox para marcar como completadas.
// Al pulsar una tarea, navega a una pantalla de detalle. Utiliza un contexto para manejar el estado de las tareas.
// El estilo se define utilizando StyleSheet de React Native para mantener la consistencia visual.
// El logo se muestra en la parte superior, seguido por un botón para agregar nuevas tareas.
// El uso de TouchableOpacity permite que los elementos sean interactivos y respondan a toques del usuario.
// El FlatList se utiliza para renderizar la lista de tareas de manera eficiente, permitiendo desplazamiento y optimización de rendimiento.
// Cada tarea se muestra con su título y un checkbox que indica si está completada o no.
// El uso de useContext permite acceder al contexto de tareas y sus funciones, como toggleCompleted para alternar el estado de completado de una tarea.
// Este enfoque modular y basado en contexto facilita la gestión del estado de las tareas y la navegación entre pantallas en la aplicación.
