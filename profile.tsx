// app/(tabs)/profile.tsx

import { Picker } from '@react-native-picker/picker';
import React, { useContext, useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native';
import { TaskContext } from '../../context/TaskContext';

type Language = 'es' | 'en';
type TimeFormat = '12h' | '24h';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName]       = useState('Usuario Ejemplo');
  const [email, setEmail]     = useState('ejemplo@correo.com');
  const [age, setAge]         = useState('21');

  const [isDarkMode, setIsDarkMode]               = useState(false);
  const [notificationsEnabled, setNotifications]  = useState(true);

  // Nuevos ajustes
  const [language, setLanguage]       = useState<Language>('es');
  const [timeFormat, setTimeFormat]   = useState<TimeFormat>('24h');

  const { tasks } = useContext(TaskContext);

  const handleSaveProfile = () => {
    if (!name.trim() || !email.trim() || !age.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    setIsEditing(false);
    // Aquí podrías persistir los ajustes (language, timeFormat, sortOption)
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDarkMode && styles.darkBackground
      ]}
    >
      <Text style={[styles.heading, isDarkMode && styles.darkText]}>
        ⚙️ Perfil y Configuración
      </Text>

      {isEditing ? (
        <>
          {/* Campos de datos personales */}
          <View style={styles.formRow}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>
              Nombre:
            </Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.inputDark]}
              value={name}
              onChangeText={setName}
              placeholder="Tu nombre"
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>
              Correo:
            </Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.inputDark]}
              value={email}
              onChangeText={setEmail}
              placeholder="tucorreo@ejemplo.com"
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.formRow}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>
              Edad:
            </Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.inputDark]}
              value={age}
              onChangeText={setAge}
              placeholder="Tu edad"
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
              keyboardType="numeric"
            />
          </View>

          {/* Botones guardar/cancelar */}
          <View style={styles.buttonRow}>
            <Button title="Guardar" onPress={handleSaveProfile} />
            <Button
              title="Cancelar"
              color="#777"
              onPress={() => setIsEditing(false)}
            />
          </View>
        </>
      ) : (
        <>
          {/* Vista de datos personales */}
          <View style={styles.infoSection}>
            <Text style={[styles.infoLabel, isDarkMode && styles.darkText]}>
              Nombre:
            </Text>
            <Text style={[styles.infoText, isDarkMode && styles.darkText]}>
              {name}
            </Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={[styles.infoLabel, isDarkMode && styles.darkText]}>
              Correo:
            </Text>
            <Text style={[styles.infoText, isDarkMode && styles.darkText]}>
              {email}
            </Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={[styles.infoLabel, isDarkMode && styles.darkText]}>
              Edad:
            </Text>
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

      {/* Ajustes de UI */}
      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>
          Modo oscuro
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(v => !v)}
        />
      </View>
      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>
          Notificaciones
        </Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={() => setNotifications(v => !v)}
        />
      </View>

      {/* Nuevo: Idioma */}
      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>
          Idioma
        </Text>
        <Picker
          selectedValue={language}
          onValueChange={val => setLanguage(val as Language)}
          style={[styles.picker, isDarkMode && styles.pickerDark]}
        >
          <Picker.Item label="Español" value="es" />
          <Picker.Item label="Inglés"   value="en" />
        </Picker>
      </View>

      {/* Nuevo: Formato de hora */}
      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>
          Formato de hora
        </Text>
        <Picker
          selectedValue={timeFormat}
          onValueChange={val => setTimeFormat(val as TimeFormat)}
          style={[styles.picker, isDarkMode && styles.pickerDark]}
        >
          <Picker.Item label="24 horas" value="24h" />
          <Picker.Item label="12 horas" value="12h" />
        </Picker>
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
  container:    { flexGrow:1, padding:16, backgroundColor:'#fff' },
  darkBackground:{ backgroundColor:'#333' },
  heading:      { fontSize:24, fontWeight:'bold', marginBottom:24, color:'#1E88E5', textAlign:'center' },
  darkText:     { color:'#fff' },

  infoSection:  { flexDirection:'row', marginBottom:12 },
  infoLabel:    { fontWeight:'bold', width:80, fontSize:16, color:'#333' },
  infoText:     { fontSize:16, color:'#555' },
  editButton:   { marginVertical:12, alignItems:'flex-start' },

  formRow:      { marginBottom:12 },
  label:        { fontSize:16, color:'#333' },
  input:        { borderWidth:1, borderColor:'#aaa', padding:8, marginTop:4, borderRadius:4, color:'#000' },
  inputDark:    { borderColor:'#555', color:'#fff' },
  buttonRow:    { flexDirection:'row', justifyContent:'space-between', marginBottom:16 },

  separator:    { height:1, backgroundColor:'#ccc', marginVertical:16 },
  section:      { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:12 },
  picker:       { flex:1, marginLeft:8 },
  pickerDark:   { backgroundColor:'#555', color:'#fff' },

  footer:       { marginTop:24, alignItems:'center' },
  subheading:   { fontSize:16, color:'#333' },
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
