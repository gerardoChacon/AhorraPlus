import { 
  Text, 
  StyleSheet, 
  View, 
  TextInput, 
  Image, 
  Dimensions, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../models/AuthContext'; 

const {width, height} = Dimensions.get('window');

const Registro = () => {
  const navigation = useNavigation();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const { nombre, email, password, confirmPassword } = formData;

    // Validaciones
    if (!nombre || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }

    console.log('Iniciando registro...');
    setLoading(true);
    
    try {
      const result = await register({ nombre, email, password });
      console.log('Resultado del registro:', result);
      
      if (result.success) {
        Alert.alert('Éxito', 'Cuenta creada correctamente', [
          { text: 'OK', onPress: () => navigation.navigate('MyTabs') }
        ]);
      } else {
        Alert.alert('Error', result.error || 'Error al crear la cuenta');
      }
    } catch (error) {
      console.log('Error catch:', error);
      Alert.alert('Error', 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.containerLogin}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logoAhorraMas.png")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.titulo}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#1B5E20"
        value={formData.nombre}
        onChangeText={(text) => updateField('nombre', text)}
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electronico"
        placeholderTextColor="#1B5E20"
        value={formData.email}
        onChangeText={(text) => updateField('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#1B5E20"
        value={formData.password}
        onChangeText={(text) => updateField('password', text)}
        secureTextEntry
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        placeholderTextColor="#1B5E20"
        value={formData.confirmPassword}
        onChangeText={(text) => updateField('confirmPassword', text)}
        secureTextEntry
        editable={!loading}
      />

      <TouchableOpacity 
        style={[styles.botonSesion, loading && { opacity: 0.6 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.botonText}>Crear cuenta</Text>
        )}
      </TouchableOpacity>

      <View style={styles.linksContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          disabled={loading}
        >
          <Text style={styles.linkText}>¿Ya tienes cuenta? inicia sesion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function RegistroDeUsuario() {
  return <Registro />;
}

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  logoContainer: {
    alignItems: 'center',
    marginTop: 70,
    zIndex: 10,
  },

  logo:{
    width: 150,
    height: 150,
    marginBottom: 10,
    resizeMode: 'contain',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
    color: '#000000ff',
    zIndex: 10,
    fontFamily: 'Montserrat',
  },

  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    fontFamily: 'Montserrat',
    zIndex: 10,
  },

  botonSesion: {
    width: '100%',
    height: 50,
    backgroundColor: '#1B5E20',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    zIndex: 10,
  },

  botonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },

  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 10,
    zIndex: 10,
  },

  linkText: {
    color: '#1B5E20',
    fontSize: 14,
  },
});