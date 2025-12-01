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

// AGRUPAR INGRESOS Y EGRESOS POR CATEGORÍA (usando titulo como categoría)
export const obtenerTransaccionesPorCategoria = async () => {
  const ingresos = await db.getAllAsync(
    `SELECT titulo as categoria, SUM(monto) as total FROM transacciones WHERE categoria = 'Ingreso' GROUP BY titulo;`
  );
  const egresos = await db.getAllAsync(
    `SELECT titulo as categoria, SUM(monto) as total FROM transacciones WHERE categoria = 'Egreso' GROUP BY titulo;`
  );
  return { ingresos, egresos };
};

// OBTENER INGRESOS POR CATEGORÍA DEL MES ACTUAL
export const obtenerIngresosPorCategoriaDelMes = async () => {
  const mes = new Date().getMonth() + 1;
  const año = new Date().getFullYear();
  
  const ingresos = await db.getAllAsync(
    `SELECT titulo as categoria, SUM(monto) as total FROM transacciones 
     WHERE categoria = 'Ingreso' 
     AND strftime('%m', fecha) = ? 
     AND strftime('%Y', fecha) = ?
     GROUP BY titulo;`,
    [mes.toString().padStart(2, '0'), año.toString()]
  );
  
  return ingresos || [];
};

// OBTENER EGRESOS POR CATEGORÍA DEL MES ACTUAL
export const obtenerEgresosPorCategoriaDelMes = async () => {
  const mes = new Date().getMonth() + 1;
  const año = new Date().getFullYear();
  
  const egresos = await db.getAllAsync(
    `SELECT titulo as categoria, SUM(monto) as total FROM transacciones 
     WHERE categoria = 'Egreso' 
     AND strftime('%m', fecha) = ? 
     AND strftime('%Y', fecha) = ?
     GROUP BY titulo;`,
    [mes.toString().padStart(2, '0'), año.toString()]
  );
  
  return egresos || [];
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

// OBTENER INGRESOS Y EGRESOS DE LOS ÚLTIMOS 6 MESES
export const obtenerIngresosPor6Meses = async () => {
  const datos = await db.getAllAsync(
    `SELECT 
      strftime('%m', fecha) as mes,
      strftime('%Y', fecha) as año,
      SUM(monto) as total
     FROM transacciones 
     WHERE categoria = 'Ingreso'
     AND fecha >= date('now', '-6 months')
     GROUP BY año, mes
     ORDER BY año ASC, mes ASC;`
  );
  
  return datos || [];
};

export const obtenerEgresosPor6Meses = async () => {
  const datos = await db.getAllAsync(
    `SELECT 
      strftime('%m', fecha) as mes,
      strftime('%Y', fecha) as año,
      SUM(monto) as total
     FROM transacciones 
     WHERE categoria = 'Egreso'
     AND fecha >= date('now', '-6 months')
     GROUP BY año, mes
     ORDER BY año ASC, mes ASC;`
  );
  
  return datos || [];
};
