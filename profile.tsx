// Importación de librerías de React y React Native necesarias para la interfaz y control de estado
import React, { useContext, useState } from 'react';
import {
  Alert,         // Muestra mensajes emergentes para errores o confirmaciones
  Button,        // Componente de botón nativo
  ScrollView,    // Permite desplazar el contenido verticalmente
  StyleSheet,    // Define estilos personalizados
  Switch,        // Componente de interruptor booleano
  Text,          // Muestra texto estático
  TextInput,     // Campo de entrada de texto editable
  View           // Contenedor general para organizar la estructura visual
} from 'react-native';

// Importa el contexto de tareas definido en otro archivo para obtener datos globales
import { TaskContext } from '../../context/TaskContext';

// Componente principal de perfil del usuario
export default function ProfileScreen() {
  // Estados locales para manejar los datos del perfil y configuración del usuario
  const [isEditing, setIsEditing] = useState(false); // Activa o desactiva el modo edición
  const [name, setName] = useState('Abelardo Arrocha'); // Nombre del usuario
  const [email, setEmail] = useState('ejemplo@correo.com'); // Email del usuario
  const [age, setAge] = useState('21'); // Edad representada como cadena para facilitar el TextInput
  const [isDarkMode, setIsDarkMode] = useState(false); // Activa o desactiva el modo oscuro
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Activa o desactiva las notificaciones

  // Accede al array de tareas desde el contexto global de la app
  const { tasks } = useContext(TaskContext);

  // Función ejecutada al presionar "Guardar" para validar los campos del formulario
  const handleSaveProfile = () => {
    // Verifica que ningún campo esté vacío después de quitar espacios
    if (!name.trim() || !email.trim() || !age.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.'); // Muestra alerta si hay errores
      return;
    }
    // Si todo está bien, sale del modo edición
    setIsEditing(false);
  };

  return (
    // ScrollView permite que el contenido sea desplazable en pantallas pequeñas
    <ScrollView
      contentContainerStyle={[
        styles.container,                  // Estilo base del contenedor
        isDarkMode && styles.darkBackground // Aplica fondo oscuro si está activado
      ]}
    >
      {/* Encabezado principal de la pantalla */}
      <Text style={[styles.heading, isDarkMode && styles.darkText]}>
        ⚙️ Perfil y Configuración
      </Text>

      {/* Si está en modo edición, se muestran los campos para editar nombre, correo y edad */}
      {isEditing ? (
        <>
          {/* Campo: Nombre */}
          <View style={styles.formRow}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Ingresa tu nombre completo"
            />
          </View>

          {/* Campo: Correo electrónico */}
          <View style={styles.formRow}>
            <Text style={styles.label}>Correo:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="correo@ejemplo.com"
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
              placeholder="Ej. 21"
            />
          </View>

          {/* Botones de acción para guardar o cancelar los cambios */}
          <View style={styles.buttonRow}>
            <Button title="Guardar" onPress={handleSaveProfile} />
            <Button
              title="Cancelar"
              color="#777"
              onPress={() => setIsEditing(false)} // Cancela edición y vuelve al modo lectura
            />
          </View>
        </>
      ) : (
        // Si no está en modo edición, muestra los datos como texto solamente
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

          {/* Botón para activar el modo edición */}
          <View style={styles.editButton}>
            <Button title="✏️ Editar perfil" onPress={() => setIsEditing(true)} />
          </View>
        </>
      )}

      {/* Línea divisoria entre perfil y configuraciones */}
      <View style={styles.separator} />

      {/* Configuración de modo oscuro con interruptor */}
      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>
          Modo oscuro
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(v => !v)} // Cambia el estado del modo oscuro
        />
      </View>

      {/* Configuración de notificaciones con interruptor */}
      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>
          Notificaciones
        </Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={() => setNotificationsEnabled(v => !v)} // Cambia el estado de las notificaciones
        />
      </View>

      {/* Pie de página que muestra cuántas tareas tiene el usuario */}
      <View style={styles.footer}>
        <Text style={[styles.subheading, isDarkMode && styles.darkText]}>
          Tienes {tasks.length} tareas almacenadas
        </Text>
      </View>
    </ScrollView>
  );
}

// Definición de los estilos que se usan en toda la pantalla
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff' // Fondo claro por defecto
  },
  darkBackground: {
    backgroundColor: '#333' // Fondo oscuro si el modo oscuro está activado
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1E88E5', // Azul vibrante
    textAlign: 'center'
  },
  darkText: {
    color: '#fff' // Texto blanco para fondo oscuro
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
