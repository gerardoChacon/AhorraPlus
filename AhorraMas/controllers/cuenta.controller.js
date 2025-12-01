import { db } from "../database/db";

// OBTENER TODAS LAS CUENTAS
export const obtenerCuentas = async () => {
  const rows = await db.getAllAsync("SELECT * FROM cuentas ORDER BY id ASC;");
  return rows;
};

// ACTUALIZAR CUENTA
export const actualizarCuenta = async (cuenta) => {
  await db.runAsync(
    `UPDATE cuentas SET name = ?, balance = ?, color = ?, icon = ? WHERE id = ?;`,
    [cuenta.name, cuenta.balance, cuenta.color, cuenta.icon, cuenta.id]
  );
};

// AGREGAR CUENTA
export const agregarCuenta = async (cuenta) => {
  await db.runAsync(
    `INSERT INTO cuentas (name, balance, color, icon) VALUES (?, ?, ?, ?);`,
    [cuenta.name, cuenta.balance, cuenta.color, cuenta.icon]
  );
};

// ELIMINAR CUENTA
export const eliminarCuenta = async (id) => {
  await db.runAsync("DELETE FROM cuentas WHERE id = ?;", [id]);
};
