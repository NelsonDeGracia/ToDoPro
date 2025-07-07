// Importación de dependencias necesarias desde React y React Native
import React, { useContext, useState } from 'react';
import {
  Alert,         // Para mostrar diálogos de alerta
  Button,        // Botón nativo de React Native
  ScrollView,    // Contenedor desplazable
  StyleSheet,    // Para definir estilos
  Switch,        // Interruptor para opciones booleanas
  Text,          // Para mostrar texto
  TextInput,     // Campo de entrada de texto
  View           // Contenedor genérico
} from 'react-native';

// Importación del contexto que maneja las tareas
import { TaskContext } from '../../context/TaskContext';

export default function ProfileScreen() {
  // Estados locales para controlar edición del perfil y configuraciones
  const [isEditing, setIsEditing] = useState(false);               // Controla si está en modo edición
  const [name, setName] = useState('Abelardo Arrocha');           // Nombre del usuario
  const [email, setEmail] = useState('ejemplo@correo.com');       // Correo electrónico del usuario
  const [age, setAge] = useState('21');                           // Edad como texto para TextInput
  const [isDarkMode, setIsDarkMode] = useState(false);            // Modo oscuro activado o no
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Notificaciones activadas

  // Obtenemos las tareas almacenadas desde el contexto global
  const { tasks } = useContext(TaskContext);

  // Función que valida los campos y sale del modo edición si todo es correcto
  const handleSaveProfile = () => {
    // Verifica que ningún campo esté vacío después de quitar espacios
    if (!name.trim() || !email.trim() || !age.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    // Si es válido, desactiva el modo edición
    setIsEditing(false);
  };

  return (
    // ScrollView con estilos dinámicos que cambian según el modo oscuro
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDarkMode && styles.darkBackground // Aplica fondo oscuro si corresponde
      ]}
    >
      {/* Encabezado principal */}
      <Text style={[styles.heading, isDarkMode && styles.darkText]}>
        ⚙️ Perfil y Configuración
      </Text>

      {isEditing ? (
        // Si está en modo edición, muestra el formulario
        <>
          {/* Campo de edición: Nombre */}
          <View style={styles.formRow}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Campo de edición: Correo electrónico */}
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

          {/* Campo de edición: Edad */}
          <View style={styles.formRow}>
            <Text style={styles.label}>Edad:</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
          </View>

          {/* Botones para guardar o cancelar los cambios */}
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
        // Cuando NO está en modo edición, muestra los datos del perfil
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

          {/* Botón para entrar en modo edición */}
          <View style={styles.editButton}>
            <Button title="✏️ Editar perfil" onPress={() => setIsEditing(true)} />
          </View>
        </>
      )}

      {/* Línea separadora */}
      <View style={styles.separator} />

      {/* Sección de ajustes: Modo oscuro */}
      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>
          Modo oscuro
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(v => !v)}
        />
      </View>

      {/* Sección de ajustes: Notificaciones */}
      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>
          Notificaciones
        </Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={() => setNotificationsEnabled(v => !v)}
        />
      </View>

      {/* Pie de página que muestra cuántas tareas hay */}
      <View style={styles.footer}>
        <Text style={[styles.subheading, isDarkMode && styles.darkText]}>
          Tienes {tasks.length} tareas almacenadas
        </Text>
      </View>
    </ScrollView>
  );
}

// Definición de estilos para los diferentes elementos de la pantalla
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
