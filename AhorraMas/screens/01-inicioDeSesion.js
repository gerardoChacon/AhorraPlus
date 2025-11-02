import { Text, StyleSheet, View, TextInput, Image, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
const {height} = Dimensions.get('window');


// Funcion Pantalla de carga

const PantallaInicial = () => {
  return (
    <View style={styles.pantallaInicialContainer}>

      <Image
        source={require("../assets/logoAhorraMas.png")}
        style={styles.logo}
        
      />

      <Text style={styles.nombreApp}>AHORRA+APP</Text>
      <ActivityIndicator size="large" color="white" style={{marginTop: 40}}/>
      <Text style={styles.loadingText}>Cargando...</Text>

    </View>
  );
};




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
  } 

  return (
    <View>
      <Text>Hola</Text>
    </View>
  )

   
}

const styles = StyleSheet.create({

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

  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
})