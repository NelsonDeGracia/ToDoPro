// app/(tabs)/profile.tsx
// app/(tabs)/profile.tsx

import React, { useContext, useState } from 'react';
import {
  Alert, Button, ScrollView, StyleSheet, Switch, Text, TextInput, View
} from 'react-native';
import { TaskContext } from '../../context/TaskContext';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Abelardo Arrocha');
  const [email, setEmail] = useState('ejemplo@correo.com');
  const [age, setAge] = useState('21');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Ya no necesitamos clearAllTasks aquí
  const { tasks } = useContext(TaskContext);

  const handleSaveProfile = () => {
    if (!name.trim() || !email.trim() || !age.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    setIsEditing(false);
  };

  return (
    <ScrollView contentContainerStyle={[
      styles.container,
      isDarkMode && styles.darkBackground
    ]}>
      <Text style={[styles.heading, isDarkMode && styles.darkText]}>
        ⚙️ Perfil y Configuración
      </Text>

      {isEditing ? (
        <>
          <View style={styles.formRow}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          </View>
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
          <View style={styles.formRow}>
            <Text style={styles.label}>Edad:</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.buttonRow}>
            <Button title="Guardar" onPress={handleSaveProfile} />
            <Button title="Cancelar" color="#777" onPress={() => setIsEditing(false)} />
          </View>
        </>
      ) : (
        <>
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
          <View style={styles.editButton}>
            <Button title="✏️ Editar perfil" onPress={() => setIsEditing(true)} />
          </View>
        </>
      )}

      <View style={styles.separator} />

      {/* Ajustes */}
      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>Modo oscuro</Text>
        <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(v => !v)} />
      </View>
      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>Notificaciones</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={() => setNotificationsEnabled(v => !v)}
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.subheading, isDarkMode && styles.darkText]}>
          Tienes {tasks.length} tareas almacenadas
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow:1, padding:16, backgroundColor:'#fff' },
  darkBackground:{ backgroundColor:'#333' },
  heading:{ fontSize:24, fontWeight:'bold', marginBottom:24, color:'#1E88E5', textAlign:'center' },
  darkText:{ color:'#fff' },
  infoSection:{ flexDirection:'row', marginBottom:12 },
  infoLabel:{ fontWeight:'bold', width:80, fontSize:16, color:'#333' },
  infoText:{ fontSize:16, color:'#555' },
  editButton:{ marginVertical:12, alignItems:'flex-start' },
  formRow:{ marginBottom:12 },
  label:{ fontSize:16, color:'#333' },
  input:{ borderWidth:1, borderColor:'#aaa', padding:8, marginTop:4, borderRadius:4 },
  buttonRow:{ flexDirection:'row', justifyContent:'space-between', marginBottom:16 },
  separator:{ height:1, backgroundColor:'#ccc', marginVertical:16 },
  section:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:12 },
  footer:{ marginTop:24, alignItems:'center' },
  subheading:{ fontSize:16 },
});

// Este código define una pantalla de perfil y configuración en una aplicación React Native utilizando Expo Router.
// Permite al usuario ver y editar su perfil, así como ajustar configuraciones como el modo oscuro y las notificaciones.
// Utiliza el contexto de tareas para mostrar la cantidad de tareas almacenadas y permite limpiar todas las tareas con confirmación previa.
// El estilo se define utilizando StyleSheet de React Native para mantener la consistencia visual en la aplicación.
// El uso de ScrollView permite que el contenido sea desplazable, lo cual es útil para pantallas con mucho contenido.
// El uso de Switch permite al usuario activar o desactivar opciones de configuración de manera intuitiva.
// El uso de Alert permite mostrar mensajes de confirmación antes de realizar acciones destructivas como eliminar todas las tareas.
// Este enfoque modular y basado en contexto facilita la gestión del estado de las tareas y la navegación entre pantallas en la aplicación.
// Además, el uso de estados locales permite manejar la edición del perfil y las configuraciones de manera eficiente.
// La pantalla está diseñada para ser responsiva y fácil de usar, con un enfoque en la usabilidad y la experiencia del usuario.
// El uso de TextInput permite al usuario ingresar y editar su información de perfil, mientras que
// los botones permiten guardar cambios o cancelar la edición de manera sencilla. 