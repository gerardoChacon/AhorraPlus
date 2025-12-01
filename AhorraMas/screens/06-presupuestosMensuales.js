import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import Presupuesto from "../models/presupuesto.model";
import {
  agregarPresupuesto,
  obtenerPresupuestos,
  eliminarPresupuesto,
  editarPresupuesto,
} from "../controllers/presupuesto.controller";
import { createTables } from "../database/db";

export default function PresupuestoScreen() {
  const [lista, setLista] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // filtros
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  // formulario
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");

  const [editId, setEditId] = useState(null);

  // presupuesto límite configurable
  const [limite, setLimite] = useState("5000");

  const cargar = async () => {
    let data = await obtenerPresupuestos();

    if (filtroCategoria.trim()) {
      data = data.filter((p) =>
        p.categoria.toLowerCase().includes(filtroCategoria.toLowerCase())
      );
    }

    if (filtroFecha.trim()) {
      data = data.filter((p) => p.fecha.includes(filtroFecha));
    }

    setLista(data);
  };

  useEffect(() => {
    createTables();
    cargar();
  }, []);

  useEffect(() => {
    cargar();
  }, [filtroCategoria, filtroFecha]);

  const guardar = async () => {
    if (!monto.trim() || !categoria.trim() || !fecha.trim()) {
      Alert.alert("Campos incompletos", "Llena todos los campos antes de guardar.");
      return;
    }

    const nuevo = new Presupuesto(
      parseFloat(monto),
      categoria,
      fecha
    );

    if (editId) {
      await editarPresupuesto(editId, nuevo);
      setEditId(null);
    } else {
      await agregarPresupuesto(nuevo);
    }

    setMonto("");
    setCategoria("");
    setFecha("");

    setModalVisible(false);
    cargar();
  };

  const borrar = async (id) => {
    await eliminarPresupuesto(id);
    cargar();
  };

  const total = lista.reduce((acc, p) => acc + p.monto, 0);

  // alerta si se pasa del límite definido
  useEffect(() => {
    if (limite && total > parseFloat(limite)) {
      Alert.alert(
        "Presupuesto excedido 🚨",
        "Tu gasto total ya supera el límite establecido."
      );
    }
  }, [total, limite]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.body}>

        <Text style={styles.header}>Presupuestos</Text>

        {/* CAMPO PARA DEFINIR PRESUPUESTO LÍMITE */}
        <TextInput
          style={styles.inputFiltro}
          placeholder="Define tu presupuesto límite (ej: 5000)"
          keyboardType="numeric"
          value={limite}
          onChangeText={setLimite}
        />

        {/* FILTROS */}
        <View style={styles.filtros}>
          <TextInput
            style={styles.inputFiltro}
            placeholder="Filtrar por categoría (ej: Comida)"
            value={filtroCategoria}
            onChangeText={setFiltroCategoria}
          />

          <TextInput
            style={styles.inputFiltro}
            placeholder="Filtrar por fecha (YYYY-MM-DD)"
            value={filtroFecha}
            onChangeText={setFiltroFecha}
          />
        </View>

        {/* CÍRCULO DEL TOTAL */}
        <View style={styles.chart}>
          <Text style={styles.chartText}>${total}</Text>
        </View>

        {/* LISTA */}
        {lista.length === 0 ? (
          <Text style={styles.empty}>No hay presupuestos aún.</Text>
        ) : (
          lista.map((item) => (
            <View key={item.id} style={styles.card}>
              <View>
                <Text style={styles.cardTitle}>{item.categoria}</Text>
                <Text style={styles.cardAmount}>${item.monto}</Text>
                <Text style={styles.cardDate}>{item.fecha}</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    setEditId(item.id);
                    setMonto(item.monto.toString());
                    setCategoria(item.categoria);
                    setFecha(item.fecha);
                    setModalVisible(true);
                  }}
                >
                  <Feather name="edit" size={22} color="#0E5B10" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => borrar(item.id)}>
                  <Feather name="trash-2" size={22} color="#cc0000" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* BOTÓN NUEVO PRESUPUESTO */}
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => {
          setMonto("");
          setCategoria("");
          setFecha("");
          setEditId(null);
          setModalVisible(true);
        }}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editId ? "Editar presupuesto" : "Nuevo presupuesto"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Monto (ej: 1500)"
              keyboardType="numeric"
              value={monto}
              onChangeText={setMonto}
              placeholderTextColor="#666"
            />

            <TextInput
              style={styles.input}
              placeholder="Categoría (ej: Comida, Transporte)"
              value={categoria}
              onChangeText={setCategoria}
              placeholderTextColor="#666"
            />

            <TextInput
              style={styles.input}
              placeholder="Fecha (YYYY-MM-DD)"
              value={fecha}
              onChangeText={setFecha}
              placeholderTextColor="#666"
            />

            <TouchableOpacity style={styles.saveButton} onPress={guardar}>
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
  body: { padding: 20 },
  header: { fontSize: 25, fontWeight: "bold", color: "#0E5B10", marginBottom: 20 },

  filtros: { gap: 10, marginBottom: 20 },
  inputFiltro: { backgroundColor: "#eee", padding: 12, borderRadius: 8 },

  chart: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#e8f3e8",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  chartText: { fontSize: 32, fontWeight: "bold" },

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardAmount: { fontSize: 18, color: "#0E5B10" },
  cardDate: { color: "#999" },

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
    textAlign: "center",
    marginBottom: 15,
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
  },
  saveText: { color: "#fff", fontWeight: "bold" },
  cancelButton: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    alignItems: "center",
    marginTop: 10,
  },
  cancelText: { color: "#333" },
});
