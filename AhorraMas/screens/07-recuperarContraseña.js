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
import { generarTokenRecuperacion } from '../controllers/authController';

const {width, height} = Dimensions.get('window');

const RecuperarPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecuperarPassword = async () => {
    // Validaciones
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }

    console.log('Solicitando recuperación para:', email);
    setLoading(true);
    
    try {
      const result = await generarTokenRecuperacion(email);
      console.log('Resultado de recuperación:', result);
      
      if (result.success) {
        Alert.alert(
          'Correo enviado', 
          'Se ha enviado un enlace de recuperación a tu correo electrónico. Por favor revisa tu bandeja de entrada.',
          [
            { 
              text: 'OK', 
              onPress: () => navigation.navigate('Login') 
            }
          ]
        );
      } else {
        Alert.alert('Error', result.error || 'No se pudo enviar el correo de recuperación');
      }
    } catch (error) {
      console.log('Error catch:', error);
      Alert.alert('Error', 'Ocurrió un error inesperado al procesar tu solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.containerLogin}>

      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logoAhorraMas.png")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.titulo}>Recupera tu contraseña</Text>

      <Text style={styles.subtitulo}>
        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#1B5E20"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <TouchableOpacity 
        style={[styles.botonSesion, loading && { opacity: 0.6 }]}
        onPress={handleRecuperarPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.botonText}>Enviar enlace</Text>
        )}
      </TouchableOpacity>

      <View style={styles.linksContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          disabled={loading}
        >
          <Text style={styles.linkText}>Volver a Iniciar sesión</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default function RecuperarContraseña() {
  return <RecuperarPassword />;
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
    marginTop: 80,
    zIndex: 10,
  },

  logo:{
    width: 120,
    height: 120,
    marginBottom: 30,
    resizeMode: 'contain',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#000000',
    zIndex: 10,
    fontFamily: 'Montserrat',
  },

  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 20,
    fontFamily: 'Montserrat',
  },

  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 25,
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
    marginTop: 10,
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
    marginTop: 25,
    paddingHorizontal: 10,
    zIndex: 10,
  },

  linkText: {
    color: '#1B5E20',
    fontSize: 14,
    fontWeight: '500',
  },
});