import React, { useState } from "react";
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

export default function EgresosScreen() {
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
  const fechaActual = `Hoy, ${hoy.getDate()} de ${meses[hoy.getMonth()]}`;
  const [egresos, setEgresos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [cantidad, setCantidad] = useState("");

  // Total dinámico
  const totalEgresos = egresos.reduce((acc, item) => acc + item.cantidad, 0);

  const addEgreso = () => {
    if (!titulo || !cantidad) return;

    const nuevo = {
      id: Date.now(),
      titulo,
      cantidad: parseFloat(cantidad),
    };

    setEgresos([...egresos, nuevo]);
    setTitulo("");
    setCantidad("");
    setModalVisible(false);
  };

  const deleteEgreso = (id) => {
    setEgresos(egresos.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>A+</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.month}>{mesActual}</Text>
        <Text style={styles.date}>{fechaActual}</Text>

        <View style={styles.chart}>
          {/* Muestra total */}
          <Text style={[styles.chartText, { color: "#cc0000" }]}>
            -${totalEgresos}
          </Text>
        </View>

        <Text style={styles.percentText}>Egresos este mes</Text>

        {/* LISTA DINÁMICA */}
        {egresos.map((item) => (
          <View key={item.id} style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={[styles.cardAmount, { color: "#cc0000" }]}>
                -${item.cantidad}
              </Text>
            </View>

            <TouchableOpacity onPress={() => deleteEgreso(item.id)}>
              <Feather name="trash-2" size={22} color="#cc0000" />
            </TouchableOpacity>
          </View>
        ))}

        {egresos.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>
            No hay egresos aún.
          </Text>
        )}
      </ScrollView>

      {/* BOTÓN + */}
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>

      {/* MODAL PARA AGREGAR */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo egreso</Text>

            <TextInput
              style={styles.input}
              placeholder="Título (Ej. Comida)"
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

            <TouchableOpacity style={styles.saveButton} onPress={addEgreso}>
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
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },

  chartText: {
    fontSize: 32,
  },

  header: {
    backgroundColor: "#0E5B10",
    padding: 20,
    alignItems: "flex-end",
  },

  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  body: {
    padding: 20,
  },

  month: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0E5B10",
  },

  date: {
    color: "#999",
    marginBottom: 15,
  },

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

  percentText: {
    textAlign: "center",
    color: "#888",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  cardAmount: {
    fontSize: 16,
    marginTop: 5,
  },

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
  plus: {
    color: "#fff",
    fontSize: 32,
  },

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
    backgroundColor: "#cc0000",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  cancelButton: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#999",
  },

  cancelText: {
    color: "#333",
    fontSize: 16,
  },
});
