// app/add.tsx
// este codigo lo que hace es crear una pantalla para agregar nuevas tareas a una lista de tareas en una aplicación React Native utilizando Expo Router.
// Permite al usuario ingresar un título y una descripción para la tarea, y al guardar, añade la tarea al contexto de tareas y regresa a la pantalla anterior.
// Utiliza el contexto de tareas para manejar el estado de las tareas y la navegación entre pantallas.
// El estilo se define utilizando StyleSheet de React Native para mantener la consistencia visual en la aplicación.
// El uso de useContext permite acceder al contexto de tareas y sus funciones, como addTask para añadir una nueva tarea.
// El uso de Alert permite mostrar mensajes de error si el título no se proporciona al intentar guardar la tarea.
// Este enfoque modular y basado en contexto facilita la gestión del estado de las tareas y la navegación entre pantallas en la aplicación.

import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text, TextInput,
  View
} from 'react-native';
import { Category, TaskContext } from '../context/TaskContext';

export default function AddTaskScreen() {
  const { addTask } = useContext(TaskContext);
  const router = useRouter();

  const [title, setTitle]         = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory]   = useState<Category>('Universidad');
  const [dueDate, setDueDate]     = useState(''); // YYYY-MM-DD
  const [dueTime, setDueTime]     = useState(''); // HH:MM

  const onSave = () => {
    if (!title.trim()) {
      return Alert.alert('Error', 'El título es obligatorio');
    }
    if (!dueDate.trim() || !dueTime.trim()) {
      return Alert.alert('Error', 'Debes asignar fecha y hora de vencimiento');
    }
    addTask({
      title: title.trim(),
      description: description.trim(),
      completed: false,
      category,
      dueDate,
      dueTime
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Descripción (opcional)"
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

      <Text style={styles.label}>Fecha de vencimiento (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="2025-12-31"
        value={dueDate}
        onChangeText={setDueDate}
      />

      <Text style={styles.label}>Hora de vencimiento (HH:MM):</Text>
      <TextInput
        style={styles.input}
        placeholder="14:30"
        value={dueTime}
        onChangeText={setDueTime}
      />

      <Button title="Guardar tarea" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex:1, padding:16 },
  label:      { fontWeight:'bold', marginTop:12 },
  input:      {
    borderWidth:1,
    borderColor:'#ccc',
    padding:8,
    marginTop:4,
    borderRadius:4
  },
  textarea:   { height:80, textAlignVertical:'top' },
  picker:     { marginTop:4 }
});
