// app/add.tsx
// este codigo lo que hace es crear una pantalla para agregar nuevas tareas a una lista de tareas en una aplicación React Native utilizando Expo Router.
// Permite al usuario ingresar un título y una descripción para la tarea, y al guardar, añade la tarea al contexto de tareas y regresa a la pantalla anterior.
// Utiliza el contexto de tareas para manejar el estado de las tareas y la navegación entre pantallas.
// El estilo se define utilizando StyleSheet de React Native para mantener la consistencia visual en la aplicación.
// El uso de useContext permite acceder al contexto de tareas y sus funciones, como addTask para añadir una nueva tarea.
// El uso de Alert permite mostrar mensajes de error si el título no se proporciona al intentar guardar la tarea.
// Este enfoque modular y basado en contexto facilita la gestión del estado de las tareas y la navegación entre pantallas en la aplicación.

import { useRouter } from 'expo-router';
// Hook para navegar entre pantallas

import React, { useContext, useState } from 'react';
// React y hooks para estado local y contexto

import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
// Componentes básicos de la interfaz en React Native

import { TaskContext } from '../context/TaskContext';
// Importa el contexto de tareas

export default function AddTaskScreen() {
  const { addTask } = useContext(TaskContext); // Accede a la función para agregar tarea
  const router = useRouter(); // Para regresar a la pantalla anterior

  const [title, setTitle] = useState(''); // Estado para el título
  const [description, setDescription] = useState(''); // Estado para la descripción

  // Función que se ejecuta al guardar
  const onSave = () => {
    if (!title.trim()) return Alert.alert('Error','El título es obligatorio');
    // Agrega la nueva tarea al contexto
    addTask({ title: title.trim(), description: description.trim(), completed: false });
    router.back(); // Vuelve a la pantalla anterior
  };

  return (
    <View style={styles.container}>
      {/* Campo para el título */}
      <Text style={styles.label}>Título:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Escribe un título"
      />

      {/* Campo para la descripción */}
      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textarea]}
        placeholder="Detalles de la tarea"
        multiline
      />

      {/* Botón para guardar tarea */}
      <Button title="Guardar tarea" onPress={onSave} />
    </View>
  );
}

// Estilos para los componentes
const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  label: { marginBottom:4, fontWeight:'bold' },
  input: {
    borderWidth:1, borderColor:'#ccc',
    padding:8, marginBottom:16, borderRadius:4
  },
  textarea: { height:80, textAlignVertical:'top' },
});

