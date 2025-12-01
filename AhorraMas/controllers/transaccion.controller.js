import { db } from "../database/db";

// INSERTAR
export const agregarTransaccion = async (transaccion) => {
  await db.runAsync(
    `INSERT INTO transacciones (titulo, monto, categoria, fecha, descripcion)
     VALUES (?, ?, ?, ?, ?);`,
    [
      transaccion.titulo,
      transaccion.monto,
      transaccion.categoria,
      transaccion.fecha,
      transaccion.descripcion,
    ]
  );
};

// LEER TODAS
export const obtenerTransacciones = async () => {
  const rows = await db.getAllAsync(
    "SELECT * FROM transacciones ORDER BY fecha DESC;"
  );
  return rows;
};

// ELIMINAR
export const eliminarTransaccion = async (id) => {
  await db.runAsync("DELETE FROM transacciones WHERE id = ?;", [id]);
};
