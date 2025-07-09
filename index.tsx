// app/(tabs)/index.tsx

import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
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
import { CATEGORY_COLORS } from '../../constants/Colors';
import { TaskContext } from '../../context/TaskContext';

const logo = require('../../assets/images/logo_gestor.png');

export default function TaskListScreen() {
  const router = useRouter();
  const { tasks, toggleCompleted, toggleCanceled, deleteTask } = useContext(TaskContext);

  const handleDelete = (id: string) => {
    if (Platform.OS === 'web') {
      if (window.confirm('¿Seguro que deseas eliminar esta tarea?')) {
        deleteTask(id);
      }
      return;
    }
    Alert.alert(
      'Eliminar tarea',
      '¿Seguro que deseas eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteTask(id),
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add')}
      >
        <Text style={styles.addButtonText}>➕ Agregar tarea</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={t => t.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.taskRow}>
              <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => router.push(`/detail/${item.id}`)}>
                  <Text
                    style={[
                      styles.taskTitle,
                      item.completed && styles.taskTitleCompleted,
                      item.canceled && styles.taskTitleCanceled
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>
                    {item.dueDate} {item.dueTime}
                  </Text>
                  <View
                    style={[
                      styles.categoryBadge,
                      { backgroundColor: CATEGORY_COLORS[item.category] }
                    ]}
                  >
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => toggleCompleted(item.id)}>
                  <Text style={styles.checkbox}>
                    {item.completed ? '✅' : '🔲'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleCanceled(item.id)}>
                  <MaterialIcons
                    name="cancel"
                    size={24}
                    color={item.canceled ? '#999' : '#D32F2F'}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteIcon}>
                  <MaterialIcons name="delete" size={24} color="#D32F2F" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:        { flex:1, padding:16 },
  logo:             { width:120, height:120, alignSelf:'center', marginBottom:16 },
  addButton:        { marginBottom:12, padding:8, backgroundColor:'#1E88E5', borderRadius:4 },
  addButtonText:    { color:'#fff', fontSize:16 },
  taskRow:          {
    flexDirection:'row', justifyContent:'space-between',
    alignItems:'flex-start', paddingVertical:12,
    borderBottomWidth:1, borderBottomColor:'#ddd'
  },
  titleContainer:   { flex:1 },
  taskTitle:        { fontSize:16, color:'#333' },
  taskTitleCompleted: { textDecorationLine:'line-through', color:'#999' },
  taskTitleCanceled:  { textDecorationLine:'line-through', color:'#bbb' },
  metaRow:          { flexDirection:'row', alignItems:'center', marginTop:4 },
  metaText:         { fontSize:12, color:'#555', marginRight:8 },
  categoryBadge:    { paddingHorizontal:6, paddingVertical:2, borderRadius:4 },
  categoryText:     { color:'#fff', fontSize:12 },
  iconsContainer:   { flexDirection:'row', alignItems:'center' },
  checkbox:         { fontSize:20, marginRight:12 },
  deleteIcon:       { padding:4 }
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
