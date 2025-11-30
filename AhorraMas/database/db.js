import { openDatabaseSync } from "expo-sqlite";

export const db = openDatabaseSync("ahorra_plus.db");

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
  `);
};
