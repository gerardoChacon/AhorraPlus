import { Text, StyleSheet, View, TextInput, Image, ActivityIndicator, Dimensions, TouchableOpacity, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
const {width, height} = Dimensions.get('window');


// Funcion Pantalla de carga

const PantallaInicial = () => {
  return (
    <View style={stylesIntro.pantallaInicialContainer}>

      <Image
        source={require("../assets/logoAhorraMas.png")}
        style={stylesIntro.logo}
        
      />

      <Text style={stylesIntro.nombreApp}>AHORRA+APP</Text>
      <ActivityIndicator size="large" color="white" style={{marginTop: 40}}/>

    </View>
  );
};


// Funcion Inicio de sesion

const Login = () => {

  return (
    <View style={stylesLogin.containerLogin}>

      <View style={stylesLogin.disenoSuperior}/>

      <View style={stylesLogin.logoContainer}>

        <Image
        source={require("../assets/logoAhorraMas.png")}
        style={stylesLogin.logo}
        />

      </View>

      <Text style={stylesLogin.titulo}>Iniciar sesión</Text>

      <TextInput
        style={stylesLogin.input}
        placeholder="Correo"
        placeholderTextColor="green"
      />

      <TextInput
        style={stylesLogin.input}
        placeholder="Contraseña"
        placeholderTextColor="green"
      />

      <TouchableOpacity style={stylesLogin.botonSesion}>
        <Text style={stylesLogin.botonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <View style={stylesLogin.linksContainer}>

        <TouchableOpacity>
          <Text style={stylesLogin.linkText}>¿Has olvidado tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={stylesLogin.linkText}>Crear cuenta</Text>
        </TouchableOpacity>

      </View>

      <View style={stylesLogin.disenoInferior}/>


    </View>

    
  );

}






export default function InicioDeSesion() {
  const [inicioApp, setInicioApp] = useState(true);

  useEffect( () => {
    const tiempo = setTimeout(() => {
      setInicioApp(false);
    }, 3000);

    return () => clearTimeout(tiempo);
  }, []);


  if (inicioApp) {
    return <PantallaInicial/>;
  } else {
    return (
      <Login/>
    )
  }

   
}

const stylesIntro = StyleSheet.create({

  pantallaInicialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e8449',
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  nombreApp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },

});

const stylesLogin = StyleSheet.create({

  containerLogin: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  disenoSuperior: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 1.5,
    height: 180,
    backgroundColor: 'green',
    borderBottomLeftRadius: width * 0.8,
    zIndex: 1,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    zIndex: 10,
  },

  logo:{
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
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
    backgroundColor: 'green',
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
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
    zIndex: 10,
  },

  linkText: {
    color: 'green',
    fontSize: 14,
  },

  disenoInferior: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: width * 1.5,
    height: 180,
    backgroundColor: 'green',
    borderTopRightRadius: width * 0.8,
  }

});