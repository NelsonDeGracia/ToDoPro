// Importación de dependencias necesarias desde React y React Native
import React, { useContext, useState } from 'react';
import {
  Alert, Button, ScrollView, StyleSheet, Switch,
  Text, TextInput, View
} from 'react-native';

// Importación del contexto que maneja las tareas
import { TaskContext } from '../../context/TaskContext';

export default function ProfileScreen() {
  // Estados locales para controlar edición del perfil y configuraciones
  const [isEditing, setIsEditing] = useState(false);  // Modo de edición activado o no
  const [name, setName] = useState('Abelardo Arrocha'); // Nombre del usuario
  const [email, setEmail] = useState('ejemplo@correo.com'); // Correo electrónico
  const [age, setAge] = useState('21'); // Edad
  const [isDarkMode, setIsDarkMode] = useState(false); // Activación de modo oscuro
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Notificaciones activadas

  // Obtenemos las tareas desde el contexto
  const { tasks } = useContext(TaskContext);

  // Función que valida y guarda los cambios en el perfil
  const handleSaveProfile = () => {
    if (!name.trim() || !email.trim() || !age.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    setIsEditing(false); // Sale del modo edición si los datos son válidos
  };

  return (
    <ScrollView contentContainerStyle={[
      styles.container,
      isDarkMode && styles.darkBackground // Cambia fondo si modo oscuro está activado
    ]}>
      {/* Título */}
      <Text style={[styles.heading, isDarkMode && styles.darkText]}>
        ⚙️ Perfil y Configuración
      </Text>

      {/* Sección de edición del perfil si isEditing es true */}
      {isEditing ? (
        <>
          {/* Campo: Nombre */}
          <View style={styles.formRow}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          </View>

          {/* Campo: Correo */}
          <View style={styles.formRow}>
            <Text style={styles.label}>Correo:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Campo: Edad */}
          <View style={styles.formRow}>
            <Text style={styles.label}>Edad:</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
          </View>

          {/* Botones para guardar o cancelar edición */}
          <View style={styles.buttonRow}>
            <Button title="Guardar" onPress={handleSaveProfile} />
            <Button title="Cancelar" color="#777" onPress={() => setIsEditing(false)} />
          </View>
        </>
      ) : (
        <>
          {/* Vista del perfil sin edición */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Nombre:</Text>
            <Text style={[styles.infoText, isDarkMode && styles.darkText]}>
              {name}
            </Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Correo:</Text>
            <Text style={[styles.infoText, isDarkMode && styles.darkText]}>
              {email}
            </Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Edad:</Text>
            <Text style={[styles.infoText, isDarkMode && styles.darkText]}>
              {age} años
            </Text>
          </View>

          {/* Botón para activar modo edición */}
          <View style={styles.editButton}>
            <Button title="✏️ Editar perfil" onPress={() => setIsEditing(true)} />
          </View>
        </>
      )}

      {/* Separador visual */}
      <View style={styles.separator} />

      {/* Ajuste: Modo oscuro */}
      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>Modo oscuro</Text>
        <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(v => !v)} />
      </View>

      {/* Ajuste: Notificaciones */}
      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>Notificaciones</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={() => setNotificationsEnabled(v => !v)}
        />
      </View>

      {/* Pie de página con información de tareas */}
      <View style={styles.footer}>
        <Text style={[styles.subheading, isDarkMode && styles.darkText]}>
          Tienes {tasks.length} tareas almacenadas
        </Text>
      </View>
    </ScrollView>
  );
}

// Estilos para la pantalla y elementos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  darkBackground: {
    backgroundColor: '#333'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1E88E5',
    textAlign: 'center'
  },
  darkText: {
    color: '#fff'
  },
  infoSection: {
    flexDirection: 'row',
    marginBottom: 12
  },
  infoLabel: {
    fontWeight: 'bold',
    width: 80,
    fontSize: 16,
    color: '#333'
  },
  infoText: {
    fontSize: 16,
    color: '#555'
  },
  editButton: {
    marginVertical: 12,
    alignItems: 'flex-start'
  },
  formRow: {
    marginBottom: 12
  },
  label: {
    fontSize: 16,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    marginTop: 4,
    borderRadius: 4
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12
  },
  footer: {
    marginTop: 24,
    alignItems: 'center'
  },
  subheading: {
    fontSize: 16
  }
});
