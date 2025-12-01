import { openDatabaseSync } from "expo-sqlite";

// conexión a la base de datos
export const db = openDatabaseSync("ahorra_plus.db");

// crear tablas
export const createTables = () => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS transacciones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      monto REAL NOT NULL,
      categoria TEXT NOT NULL,
      fecha TEXT NOT NULL,
      descripcion TEXT
    );

    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      reset_token TEXT,
      reset_token_expiry INTEGER,
      fecha_creacion TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS presupuestos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      monto REAL NOT NULL,
      categoria TEXT NOT NULL,
      fecha TEXT NOT NULL
    );
  `);
};
