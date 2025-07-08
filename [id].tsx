// app/detail/[id].tsx
//este código define una pantalla de detalle de tarea en una aplicación de gestión de tareas utilizando Expo Router y React.
// Permite al usuario ver, actualizar y eliminar una tarea específica. 
// app/detail/[id].tsx
// Pantalla de detalle de una tarea: ver, actualizar y eliminar
// Importaciones necesarias desde Expo Router y React Native
import { useLocalSearchParams, useRouter } from 'expo-router';

// React y React Native para lógica de estado y componentes UI
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,        // Alerta visual para confirmaciones (en móvil)
  Button,       // Botón interactivo
  Platform,     // Detecta si la app corre en web o en móvil
  StyleSheet,   // Definición de estilos
  Text,         // Texto estático
  TextInput,    // Campo editable
  View          // Contenedor visual
} from 'react-native';

// Importamos el contexto global donde se encuentran las tareas y funciones
import { TaskContext } from '../../context/TaskContext';

// -------------------- COMPONENTE PRINCIPAL --------------------

export default function TaskDetailScreen() {
  // Extrae el parámetro dinámico 'id' de la ruta actual (usado para buscar la tarea específica)
  const { id } = useLocalSearchParams<{ id: string }>();

  // Acceso al contexto: lista de tareas + funciones para modificar o eliminar
  const { tasks, updateTask, deleteTask } = useContext(TaskContext);

  // Hook para navegar entre pantallas (volver atrás, etc.)
  const router = useRouter();

  // Busca la tarea correspondiente al ID recibido desde la ruta
  const task = tasks.find(t => t.id === id);

  // Estados locales para editar los campos de la tarea
  const [title, setTitle] = useState(task?.title ?? '');               // Título editable
  const [description, setDescription] = useState(task?.description ?? ''); // Descripción editable

  // Cuando se cambia de tarea (cambio de ID), se actualizan los campos por seguridad
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  // Si no se encontró una tarea con ese ID, muestra mensaje de error
  if (!task) {
    return (
      <View style={styles.center}>
        <Text>Tarea no encontrada</Text>
      </View>
    );
  }

  // -------------------- FUNCIONES --------------------

  // Función que actualiza la tarea usando los valores actuales de los campos
  const onUpdate = () => {
    if (!title.trim()) {
      return Alert.alert('Error', 'El título no puede quedar vacío');
    }

    // Llama a la función del contexto para actualizar y vuelve atrás
    updateTask({
      ...task, // Mantiene ID y otros campos
      title: title.trim(),
      description: description.trim()
    });

    router.back(); // Regresa a la pantalla anterior
  };

  // Función para eliminar la tarea, con confirmación diferente según plataforma
  const onDelete = () => {
    console.log('🔵 [Detail] onDelete llamado para id:', task.id);

    // En plataforma Web, se usa window.confirm
    if (Platform.OS === 'web') {
      const ok = window.confirm('¿Seguro que quieres eliminar esta tarea?');
      console.log('🔘 [Detail:web] confirm result:', ok);
      if (ok) {
        deleteTask(task.id); // Elimina la tarea
        console.log('🟢 [Detail:web] deleteTask invocado');
        router.back(); // Vuelve atrás
      }
      return;
    }

    // En móvil (Android/iOS), se usa Alert con botones
    Alert.alert(
      'Confirmar eliminación',
      '¿Seguro que quieres eliminar esta tarea?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => console.log('⚪️ [Detail] Canceló borrado')
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            console.log('🔴 [Detail] Confirmó borrado, invocando deleteTask');
            deleteTask(task.id);
            console.log('🟢 [Detail] deleteTask invocado');
            router.back(); // Regresa a la pantalla anterior
          }
        }
      ]
    );
  };

  // -------------------- RENDERIZADO --------------------

  return (
    <View style={styles.container}>
      {/* Campo de texto para editar título */}
      <Text style={styles.label}>Título:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Título de la tarea"
      />

      {/* Campo de texto para editar descripción */}
      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textarea]}
        multiline
        placeholder="Descripción de la tarea"
      />

      {/* Botón para guardar los cambios */}
      <Button title="Actualizar" onPress={onUpdate} />

      {/* Espacio visual */}
      <View style={{ height: 12 }} />

      {/* Botón para eliminar la tarea */}
      <Button title="Eliminar tarea" color="red" onPress={onDelete} />
    </View>
  );
}

// -------------------- ESTILOS --------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,             // Ocupa toda la pantalla disponible
    padding: 16          // Espaciado interno
  },
  center: {
    flex: 1,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center',     // Centra horizontalmente
    padding: 16
  },
  label: {
    fontWeight: 'bold',       // Texto en negrita
    marginBottom: 4           // Espaciado inferior
  },
  input: {
    borderWidth: 1,           // Borde alrededor del campo
    borderColor: '#ccc',      // Color gris claro
    padding: 8,               // Espaciado interno
    marginBottom: 16,         // Espaciado inferior entre campos
    borderRadius: 4           // Bordes redondeados
  },
  textarea: {
    height: 80,               // Altura para que parezca área de texto
    textAlignVertical: 'top'  // Alineación del texto desde la parte superior
  }
});


// Este código define una pantalla de detalle de tarea en una aplicación de gestión de tareas utilizando Expo Router y React.
// Permite al usuario ver, actualizar y eliminar una tarea específica.  
