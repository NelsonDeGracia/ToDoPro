// app/detail/[id].tsx
//este código define una pantalla de detalle de tarea en una aplicación de gestión de tareas utilizando Expo Router y React.
// Permite al usuario ver, actualizar y eliminar una tarea específica. 
// app/detail/[id].tsx
// Pantalla de detalle de una tarea: ver, actualizar y eliminar
// Importaciones necesarias desde Expo Router y React Native
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,        // Para mostrar confirmaciones y advertencias
  Button,       // Botones para acciones
  Platform,     // Detecta si se ejecuta en Web o móvil
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

// Importamos el contexto que contiene las tareas
import { TaskContext } from '../../context/TaskContext';

export default function TaskDetailScreen() {
  // Obtenemos el parámetro 'id' desde la URL
  const { id } = useLocalSearchParams<{ id: string }>();

  // Accedemos a funciones y tareas desde el contexto
  const { tasks, updateTask, deleteTask } = useContext(TaskContext);

  // Permite navegación entre pantallas
  const router = useRouter();

  // Buscamos la tarea actual por su ID
  const task = tasks.find(t => t.id === id);

  // Estados para edición de título y descripción
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');

  // Actualizamos los campos cuando cambia la tarea (por seguridad)
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  // Si no se encuentra la tarea, se muestra mensaje
  if (!task) {
    return (
      <View style={styles.center}>
        <Text>Tarea no encontrada</Text>
      </View>
    );
  }

  // Función para actualizar la tarea
  const onUpdate = () => {
    if (!title.trim()) return Alert.alert('Error', 'El título no puede quedar vacío');
    updateTask({ ...task, title: title.trim(), description: description.trim() });
    router.back(); // Regresa a pantalla anterior
  };

  // Función para eliminar la tarea (con confirmación)
  const onDelete = () => {
    console.log('🔵 [Detail] onDelete llamado para id:', task.id);

    // Si está en navegador web, usamos confirm()
    if (Platform.OS === 'web') {
      const ok = window.confirm('¿Seguro que quieres eliminar esta tarea?');
      console.log('🔘 [Detail:web] confirm result:', ok);
      if (ok) {
        deleteTask(task.id);
        console.log('🟢 [Detail:web] deleteTask invocado');
        router.back();
      }
      return;
    }

    // En móvil, usamos Alert de React Native
    Alert.alert(
      'Confirmar eliminación',
      '¿Seguro que quieres eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => console.log('⚪️ [Detail] Canceló borrado') },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            console.log('🔴 [Detail] Confirmó borrado, invocando deleteTask');
            deleteTask(task.id);
            console.log('🟢 [Detail] deleteTask invocado');
            router.back();
          }
        }
      ]
    );
  };

  // Render principal
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textarea]}
        multiline
      />

      {/* Botón para guardar cambios */}
      <Button title="Actualizar" onPress={onUpdate} />
      
      {/* Separador visual */}
      <View style={{ height: 12 }} />

      {/* Botón para eliminar tarea */}
      <Button title="Eliminar tarea" color="red" onPress={onDelete} />
    </View>
  );
}

// Estilos personalizados para esta pantalla
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  label: { fontWeight: 'bold', marginBottom: 4 },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    padding: 8, marginBottom: 16, borderRadius: 4
  },
  textarea: { height: 80, textAlignVertical: 'top' }
});



// Este código define una pantalla de detalle de tarea en una aplicación de gestión de tareas utilizando Expo Router y React.
// Permite al usuario ver, actualizar y eliminar una tarea específica.  
