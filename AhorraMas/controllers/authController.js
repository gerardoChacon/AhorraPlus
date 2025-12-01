import { db } from "../database/db";

const simpleHash = (password) => {
  try {
    return btoa(password);
  } catch (error) {
    return password.split('').reverse().join('') + password.length;
  }
};


const verifyHash = (password, hash) => {
  try {
    return btoa(password) === hash;
  } catch (error) {
    const testHash = password.split('').reverse().join('') + password.length;
    return testHash === hash;
  }
};

export const registrarUsuario = async (usuario) => {
  try {
    console.log('Intentando registrar usuario:', usuario.email);
    
    const passwordHash = simpleHash(usuario.password);
    
    console.log('Password hash generado');
    
    const result = await db.runAsync(
      `INSERT INTO usuarios (nombre, email, password) 
       VALUES (?, ?, ?);`,
      [usuario.nombre, usuario.email, passwordHash]
    );
    
    console.log('Usuario registrado exitosamente, ID:', result.lastInsertRowId);
    return { success: true, id: result.lastInsertRowId };
    
  } catch (error) {
    console.log('Error al registrar:', error.message);
    if (error.message.includes('UNIQUE constraint failed')) {
      return { success: false, error: 'El email ya está registrado' };
    }
    return { success: false, error: 'Error al registrar usuario: ' + error.message };
  }
};

export const iniciarSesion = async (email, password) => {
  try {
    console.log('Intentando login para:', email);
    
    const user = await db.getFirstAsync(
      `SELECT * FROM usuarios WHERE email = ?;`,
      [email]
    );
    
    if (user) {
      console.log('Usuario encontrado:', user.email);
  
      const passwordMatch = verifyHash(password, user.password);
      
      if (passwordMatch) {
        console.log('Contraseña correcta');
        return { 
          success: true, 
          user: { 
            id: user.id, 
            nombre: user.nombre, 
            email: user.email 
          } 
        };
      } else {
        console.log('Contraseña incorrecta');
      }
    } else {
      console.log('Usuario no encontrado');
    }
    
    return { success: false, error: 'Credenciales incorrectas' };
    
  } catch (error) {
    console.log('Error en login:', error);
    return { success: false, error: 'Error al iniciar sesión' };
  }
};


export const generarTokenRecuperacion = async (email) => {
  try {
    console.log('Generando token para:', email);
    
    const user = await db.getFirstAsync(
      `SELECT * FROM usuarios WHERE email = ?;`,
      [email]
    );
    
    if (!user) {
      return { success: false, error: 'No existe una cuenta con este email' };
    }
    
    const token = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    
    const expiry = Date.now() + (60 * 60 * 1000);
    
    const result = await db.runAsync(
      `UPDATE usuarios SET reset_token = ?, reset_token_expiry = ? WHERE email = ?;`,
      [token, expiry, email]
    );
    
    if (result.changes > 0) {
      console.log('Token generado exitosamente para:', email);
      
      console.log('Token de recuperación (para pruebas):', token);
      
      return { 
        success: true, 
        message: 'Se ha enviado un enlace de recuperación a tu email',
        token: token 
      };
    } else {
      return { success: false, error: 'Error al generar token de recuperación' };
    }
  } catch (error) {
    console.log('Error en generarTokenRecuperacion:', error);
    return { success: false, error: 'Error al procesar la solicitud' };
  }
};