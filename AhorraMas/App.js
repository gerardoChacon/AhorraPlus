// App.js
import React from 'react';
import { AuthProvider } from './models/AuthContext'; // Nueva ruta
import { createTables } from './database/db';
import Navigation from './Navegation'; // Ajusté el nombre basado en tu warning

// Crear tablas al iniciar la app
createTables();

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}