import { Text, StyleSheet, View, Button } from 'react-native'
import React, { useState } from 'react'

import inicioDeSesion from './01-inicioDeSesion';
import registroDeUsuario from './02-registroDeUsuario';
import graficasScreen from './03-graficasScreen';
import ingresos from './04-ingresos';
import egresos from './05-egresos';
import presupuestosMensuales from './06-presupuestosMensuales';

export default function MenuScreens() {
    const [screen, setScreen] = useState('Menu');
    switch(screen) {
        case 'inicioDeSesion':
            return <inicioDeSesion/>
        case 'registroDeUsuario':
            return <registroDeUsuario/>
        case 'graficasScreen':
            return <graficasScreen/>
        case 'ingresos':
            return <ingresos/>
        case 'egresos':
            return <egresos/>
        case 'presupuestosMensuales':
            return <presupuestosMensuales/>
        case 'Menu':
            default:
                return (
                    <View styles={styles.container}>

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
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#277901ff',
    fontSize: 30,
    marginBottom: 20,
  },

  buttonContainer: {
    width: '100%',
    gap: 10,
  }
})