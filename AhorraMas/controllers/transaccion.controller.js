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

// AGRUPAR INGRESOS Y EGRESOS POR CATEGORÍA
export const obtenerTransaccionesPorCategoria = async () => {
  const ingresos = await db.getAllAsync(
    `SELECT categoria, SUM(monto) as total FROM transacciones WHERE categoria = 'Ingreso' GROUP BY categoria;`
  );
  const egresos = await db.getAllAsync(
    `SELECT categoria, SUM(monto) as total FROM transacciones WHERE categoria = 'Egreso' GROUP BY categoria;`
  );
  return { ingresos, egresos };
};

// OBTENER INGRESOS Y GASTOS DEL MES ACTUAL
export const obtenerIngresosPorMes = async () => {
  const mes = new Date().getMonth() + 1;
  const año = new Date().getFullYear();
  
  const ingresos = await db.getAllAsync(
    `SELECT SUM(monto) as total FROM transacciones 
     WHERE categoria = 'Ingreso' 
     AND strftime('%m', fecha) = ? 
     AND strftime('%Y', fecha) = ?;`,
    [mes.toString().padStart(2, '0'), año.toString()]
  );
  
  return ingresos[0]?.total || 0;
};

export const obtenerEgresosPorMes = async () => {
  const mes = new Date().getMonth() + 1;
  const año = new Date().getFullYear();
  
  const egresos = await db.getAllAsync(
    `SELECT SUM(monto) as total FROM transacciones 
     WHERE categoria = 'Egreso' 
     AND strftime('%m', fecha) = ? 
     AND strftime('%Y', fecha) = ?;`,
    [mes.toString().padStart(2, '0'), año.toString()]
  );
  
  return egresos[0]?.total || 0;
};
