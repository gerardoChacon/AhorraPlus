import { Text, StyleSheet, View, Button } from 'react-native';
import React, { useState } from 'react';

import InicioDeSesion from './01-inicioDeSesion';
import RegistroDeUsuario from './02-registroDeUsuario';
import GraficasScreen from './03-graficasScreen';
import Ingresos from './04-ingresos';
import Egresos from './05-egresos';
import PresupuestosMensuales from './06-presupuestosMensuales';

export default function MenuScreens() {
    const [screen, setScreen] = useState('Menu');
    switch(screen) {
        case 'inicioDeSesion':
            return <InicioDeSesion/>
        case 'registroDeUsuario':
            return <RegistroDeUsuario/>
        case 'graficasScreen':
            return <GraficasScreen/>
        case 'ingresos':
            return <Ingresos/>
        case 'egresos':
            return <Egresos/>
        case 'presupuestosMensuales':
            return <PresupuestosMensuales/>
        case 'Menu':
            default:
                return (
                    <View style={styles.container}>

                        <Text style={styles.title}>Menu Screens Ahorra+App</Text>

                        <View style={styles.buttonContainer}>

                            <Button color='green' onPress={()=>setScreen('inicioDeSesion')} title='Inicio de sesion'/>
                            <Button color='green' onPress={()=>setScreen('registroDeUsuario')} title='Registro de Usuario'/>
                            <Button color='green' onPress={()=>setScreen('graficasScreen')} title='Graficas'/>
                            <Button color='green' onPress={()=>setScreen('ingresos')} title='Ingresos'/>
                            <Button color='green' onPress={()=>setScreen('egresos')} title='Egresos'/>
                            <Button color='green' onPress={()=>setScreen('presupuestosMensuales')} title='Presupuestos Mensuales'/>
                            
                            
                        </View>

                    </View>
                )
    }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#277901ff',
    fontSize: 30,
    marginBottom: 20,
  },

  buttonContainer: {
    width: '60%',
    gap: 10,
    
  }
})