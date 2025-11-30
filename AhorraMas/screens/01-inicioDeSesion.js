import { Text, StyleSheet, View, TextInput, Image, ActivityIndicator, Dimensions, TouchableOpacity, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import Svg, { Path } from "react-native-svg";
import { useNavigation } from '@react-navigation/native';
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

  const navigation = useNavigation();

  return (
    <View style={stylesLogin.containerLogin}>

      <View style={stylesLogin.disenoSuperior}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={440}
          height={159}
          fill="none"
        >
          <Path
          fill="#1B5E20"
          d="M0 0h440v91.5s-70.5-46-174.5-23S0 158.5 0 158.5V0Z"
          />
        </Svg>
      </View>

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
        placeholderTextColor="#1B5E20"
      />

      <TextInput
        style={stylesLogin.input}
        placeholder="Contraseña"
        placeholderTextColor="#1B5E20"
      />

      <TouchableOpacity 
        style={stylesLogin.botonSesion}
        onPress={() => navigation.navigate("MyTabs")}
      >

        <Text style={stylesLogin.botonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <View style={stylesLogin.linksContainer}>

        <TouchableOpacity
          onPress={() => navigation.navigate("Recuperar")}
        >
          <Text style={stylesLogin.linkText}>¿Has olvidado tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Registro")}
        >
          <Text style={stylesLogin.linkText}>Crear cuenta</Text>
        </TouchableOpacity>

      </View>

      <View style={stylesLogin.disenoInferior}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={440}
          height={258}
          fill="none"
        >
          <Path
            fill="#1B5E20"
            d="M0 141.393s25.5-1.143 228.5-17.534C431.5 107.467 440 0 440 0v258H0V141.393Z"
          />
        </Svg>
      </View>


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
    backgroundColor: '#1B5E20',
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
  

  logoContainer: {
    alignItems: 'center',
    marginTop: 0,
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
    marginBottom: 40,
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
    justifyContent: 'space-between',
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