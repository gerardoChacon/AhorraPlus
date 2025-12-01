import { db } from "../database/db";

export const createTablePresupuestos = () => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS presupuestos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      monto REAL,
      categoria TEXT,
      fecha TEXT
    );
  `);
};

export const agregarPresupuesto = async (p) => {
  return await db.runAsync(
    "INSERT INTO presupuestos (monto, categoria, fecha) VALUES (?,?,?)",
    [p.monto, p.categoria, p.fecha]
  );
};

export const obtenerPresupuestos = async () => {
  const rows = await db.getAllAsync("SELECT * FROM presupuestos");
  return rows;
};

export const eliminarPresupuesto = async (id) => {
  await db.runAsync("DELETE FROM presupuestos WHERE id = ?", [id]);
};

export const editarPresupuesto = async (id, nuevo) => {
  await db.runAsync(
    "UPDATE presupuestos SET monto=?, categoria=?, fecha=? WHERE id=?",
    [nuevo.monto, nuevo.categoria, nuevo.fecha, id]
  );
};
