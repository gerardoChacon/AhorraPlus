import { Text, StyleSheet, View, TextInput, Image, ActivityIndicator, Dimensions } from 'react-native'
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
  }
});