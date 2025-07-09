// app/detail/[id].tsx
//este código define una pantalla de detalle de tarea en una aplicación de gestión de tareas utilizando Expo Router y React.
// Permite al usuario ver, actualizar y eliminar una tarea específica. 
// Pantalla de detalle de una tarea: ver, actualizar y eliminar

import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text, TextInput,
  View
} from 'react-native';
import { Category, TaskContext } from '../../context/TaskContext';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, updateTask, deleteTask, toggleCanceled } = useContext(TaskContext);
  const router = useRouter();

  const task = tasks.find(t => t.id === id);
  const [title, setTitle]         = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [category, setCategory]   = useState<Category>(task?.category ?? 'Universidad');
  const [dueDate, setDueDate]     = useState(task?.dueDate ?? '');
  const [dueTime, setDueTime]     = useState(task?.dueTime ?? '');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
      setDueDate(task.dueDate);
      setDueTime(task.dueTime);
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
    if (!title.trim()) {
      return Alert.alert('Error', 'El título no puede quedar vacío');
    }
    if (!dueDate.trim() || !dueTime.trim()) {
      return Alert.alert('Error', 'Debes asignar fecha y hora de vencimiento');
    }
    updateTask({
      ...task,
      title: title.trim(),
      description: description.trim(),
      category,
      dueDate,
      dueTime
    });
    router.back();
  };

  const onDelete = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('¿Seguro que quieres eliminar esta tarea?')) {
        deleteTask(task.id);
        router.back();
      }
      return;
    }
    Alert.alert(
      'Confirmar eliminación',
      '¿Seguro que quieres eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteTask(task.id);
            router.back();
          }
        }
      ]
    );
  };

  const onToggleCancel = () => {
    toggleCanceled(task.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.meta}>Creada: {task.createdAt.toLocaleDateString()}</Text>

      <Text style={styles.label}>Título:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Categoría:</Text>
      <Picker
        selectedValue={category}
        onValueChange={val => setCategory(val as Category)}
        style={styles.picker}
      >
        <Picker.Item label="Universidad" value="Universidad" />
        <Picker.Item label="Trabajo"     value="Trabajo" />
        <Picker.Item label="Hogar"       value="Hogar" />
      </Picker>

      <Text style={styles.label}>Fecha de vencimiento:</Text>
      <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} />

      <Text style={styles.label}>Hora de vencimiento:</Text>
      <TextInput style={styles.input} value={dueTime} onChangeText={setDueTime} />

      <View style={styles.buttonRow}>
        <Button
          title={task.canceled ? "Reactivar" : "Cancelar tarea"}
          onPress={onToggleCancel}
        />
        <Button title="Actualizar" onPress={onUpdate} />
      </View>

      <View style={{ height:12 }} />

      <Button title="Eliminar tarea" color="red" onPress={onDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex:1, padding:16 },
  center:     { flex:1, justifyContent:'center', alignItems:'center' },
  meta:       { fontSize:12, color:'#555', marginBottom:8 },
  label:      { fontWeight:'bold', marginTop:12 },
  input:      {
    borderWidth:1,
    borderColor:'#ccc',
    padding:8,
    marginTop:4,
    borderRadius:4
  },
  textarea:   { height:80, textAlignVertical:'top' },
  picker:     { marginTop:4 },
  buttonRow:  { flexDirection:'row', justifyContent:'space-between', marginTop:16 }
});
