import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import {
  agregarTransaccion,
  obtenerTransacciones,
  eliminarTransaccion,
} from "../controllers/transaccion.controller";
import Transaccion from "../models/transaccion.model";
import { createTables } from "../database/db";

export default function IngresosScreen() {
  const [lista, setLista] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [cantidad, setCantidad] = useState("");

  // fecha actual
  const hoy = new Date();
  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const mesActual = meses[hoy.getMonth()];
  const fechaActual = `Hoy, ${hoy.getDate()} de ${mesActual}`;

  const cargarIngresos = async () => {
    const data = await obtenerTransacciones();
    const filtrados = data.filter((t) => t.categoria === "Ingreso");
    setLista(filtrados);
  };

  useEffect(() => {
    createTables();
    cargarIngresos();
  }, []);

  const addIngreso = async () => {
    if (!titulo || !cantidad) return;

    const nueva = new Transaccion(
      titulo,
      parseFloat(cantidad),
      "Ingreso",
      hoy.toISOString().slice(0, 10),
      ""
    );

    await agregarTransaccion(nueva);
    setTitulo("");
    setCantidad("");
    setModalVisible(false);
    await cargarIngresos();
  };

  const deleteIngreso = async (id) => {
    await eliminarTransaccion(id);
    await cargarIngresos();
  };

  const total = lista.reduce((acc, t) => acc + t.monto, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>A+</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.month}>{mesActual}</Text>
        <Text style={styles.date}>{fechaActual}</Text>

        <View style={styles.chart}>
          <Text style={styles.chartText}>${total}</Text>
        </View>

        <Text style={styles.percentText}>Ingresos este mes</Text>

        {lista.map((item) => (
          <View key={item.id} style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardAmount}>${item.monto}</Text>
            </View>

            <TouchableOpacity onPress={() => deleteIngreso(item.id)}>
              <Feather name="trash-2" size={22} color="#cc0000" />
            </TouchableOpacity>
          </View>
        ))}

        {lista.length === 0 && (
          <Text style={styles.empty}>No hay ingresos aún.</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo ingreso</Text>

            <TextInput
              style={styles.input}
              placeholder="Título"
              value={titulo}
              onChangeText={setTitulo}
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              keyboardType="numeric"
              value={cantidad}
              onChangeText={setCantidad}
            />

            <TouchableOpacity style={styles.saveButton} onPress={addIngreso}>
              <Text style={styles.saveText}>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  header: { backgroundColor: "#0E5B10", padding: 20, alignItems: "flex-end" },
  headerText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  body: { padding: 20 },
  month: { fontSize: 18, fontWeight: "bold", color: "#0E5B10" },
  date: { color: "#999", marginBottom: 15 },
  chart: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#eee",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  chartText: { fontSize: 32 },
  percentText: { textAlign: "center", color: "#888", marginBottom: 20 },
  empty: { textAlign: "center", marginTop: 20, color: "#777" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  cardAmount: { fontSize: 16, color: "#0E5B10" },
  plusButton: {
    backgroundColor: "#0E5B10",
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 25,
    right: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: { color: "#fff", fontSize: 32 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#0E5B10",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  cancelButton: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#999",
  },
  cancelText: { color: "#333", fontSize: 16 },
});
