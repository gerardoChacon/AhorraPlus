// Navegation.js (ajusté el nombre)
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from '@expo/vector-icons/Ionicons';

// Importaciones de las screens
import InicioDeSesion from "./screens/01-inicioDeSesion";
import RegistroDeUsuario from "./screens/02-registroDeUsuario";
import HomeScreen from "./screens/03-graficasScreen";
import IngresosScreen from "./screens/04-ingresos";
import EgresosScreen from "./screens/05-egresos";
import PresupuestoScreen from "./screens/06-presupuestosMensuales";
import RecuperarContraseña from "./screens/07-recuperarContraseña";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
    return (
    <Tab.Navigator 
        screenOptions={{ 
            headerShown: false, 
            tabBarActiveTintColor: 'green' 
        }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={HomeScreen} 
        options={{ 
            tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={24} color={color} />
            )
        }}
      />

      <Tab.Screen 
        name="Ingresos" 
        component={IngresosScreen} 
        options={{
            tabBarIcon: ({ color }) => (
                <Ionicons name="trending-up" size={24} color={ color } />
            )
        }}
      />

      <Tab.Screen 
        name="Egresos" 
        component={EgresosScreen} 
        options={{
            tabBarIcon: ({ color }) => (
                <Ionicons name="trending-down-sharp" size={24} color={ color } />
            )
        }}
      />

      <Tab.Screen 
        name="Presupuesto" 
        component={PresupuestoScreen} 
        options={{
            tabBarIcon: ({ color }) => (
                <Ionicons name="logo-usd" size={24} color={ color } />
            )
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={InicioDeSesion} />
                <Stack.Screen name="Registro" component={RegistroDeUsuario} />
                <Stack.Screen name="Recuperar" component={RecuperarContraseña} />
                <Stack.Screen name="MyTabs" component={MyTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}