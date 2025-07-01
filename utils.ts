// utils.ts
//Este codigo lo que hace es definir dos funciones para manejar el almacenamiento de datos en una aplicación React Native utilizando AsyncStorage.
// Estas funciones permiten guardar y cargar datos de manera sencilla, serializando los valores a JSON antes de guardarlos y parseándolos al cargarlos.
// Esto es útil para persistir datos entre sesiones, como por ejemplo, guardar una lista de tareas o configuraciones de usuario.
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Guarda un valor serializado bajo la clave `key`.*/
export async function saveData<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}
/* Carga y parsea el valor bajo la clave `key`, o devuelve null si no existe.*/
export async function loadData<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : null;
}
