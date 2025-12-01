import React, { createContext, useState, useContext, useEffect } from 'react';
import { registrarUsuario, iniciarSesion } from '../controllers/authController';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const result = await iniciarSesion(email, password);
      if (result.success) {
        setUser(result.user);
        return { success: true };
      }
      return result;
    } catch (error) {
      return { success: false, error: 'Error al iniciar sesión' };
    }
  };

  const register = async (userData) => {
    try {
      const result = await registrarUsuario(userData);
      if (result.success) {
        setUser({ 
          id: result.id, 
          nombre: userData.nombre, 
          email: userData.email 
        });
        return { success: true };
      }
      return result;
    } catch (error) {
      return { success: false, error: 'Error al registrar usuario' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};