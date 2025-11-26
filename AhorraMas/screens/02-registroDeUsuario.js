import { Text, StyleSheet, View, TextInput, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Svg, { Path } from "react-native-svg";
const {width, height} = Dimensions.get('window');


// Funcion Registro usuario

const Login = () => {

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
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electronico"
        placeholderTextColor="#1B5E20"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#1B5E20"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        placeholderTextColor="#1B5E20"
      />

      <TouchableOpacity style={styles.botonSesion}>
        <Text style={styles.botonText}>Crear cuenta</Text>
      </TouchableOpacity>


      <View style={styles.linksContainer}>
          <TouchableOpacity>
            <Text style={styles.linkText}>¿Ya tienes cuenta? inicia sesion</Text>
          </TouchableOpacity>
        </View>

      

      <View style={styles.disenoInferior}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={440}
          height={244}
          fill="none"
        >
          <Path
            fill="#1B5E20"
            d="M0 0s67 67.464 181.5 104.629C296 141.795 440 124.424 440 124.424V244H0V0Z"
            />
          </Svg>
      </View>


    </View>

    
  );

}






export default function RegistroDeUsuario() {
  const [inicioApp, setInicioApp] = useState(true);


  if (inicioApp) {
    return (
      <Login/>
    )
  }

   
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