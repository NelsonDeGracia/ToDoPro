// app/detail/[id].tsx
//este código define una pantalla de detalle de tarea en una aplicación de gestión de tareas utilizando Expo Router y React.
// Permite al usuario ver, actualizar y eliminar una tarea específica. 
// app/detail/[id].tsx
// Pantalla de detalle de una tarea: ver, actualizar y eliminar

import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Platform // ← importamos Platform
  ,




  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { TaskContext } from '../../context/TaskContext';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, updateTask, deleteTask } = useContext(TaskContext);
  const router = useRouter();

  const task = tasks.find(t => t.id === id);
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  if (!task) {
    return (
      <View style={styles.center}>
        <Text>Tarea no encontrada</Text>
      </View>
    );
  }

  const onUpdate = () => {
    if (!title.trim()) return Alert.alert('Error', 'El título no puede quedar vacío');
    updateTask({ ...task, title: title.trim(), description: description.trim() });
    router.back();
  };

  //lo tuvimos que poner para poder ver en consola por que no me eliminaba ni guardaba tareas 
  const onDelete = () => {
    console.log('🔵 [Detail] onDelete llamado para id:', task.id);

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

      <Button title="Actualizar" onPress={onUpdate} />
      <View style={{ height: 12 }} />
      <Button title="Eliminar tarea" color="red" onPress={onDelete} />
    </View>
  );
}

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