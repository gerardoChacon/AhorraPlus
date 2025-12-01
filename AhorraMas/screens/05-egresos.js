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
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  agregarTransaccion,
  obtenerTransacciones,
  eliminarTransaccion,
} from "../controllers/transaccion.controller";
import Transaccion from "../models/transaccion.model";
import { createTables } from "../database/db";

export default function EgresosScreen() {
  const [lista, setLista] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [cantidad, setCantidad] = useState("");

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

  const cargarEgresos = async () => {
    const data = await obtenerTransacciones();
    const filtrados = data.filter((t) => t.categoria === "Egreso");
    setLista(filtrados);
  };

  useEffect(() => {
    createTables();
    cargarEgresos();
  }, []);

  const addEgreso = async () => {
    if (!titulo || !cantidad) return;

    const nueva = new Transaccion(
      titulo,
      parseFloat(cantidad),
      "Egreso",
      hoy.toISOString().slice(0, 10),
      ""
    );

    await agregarTransaccion(nueva);
    setTitulo("");
    setCantidad("");
    setModalVisible(false);
    await cargarEgresos();
  };

  const deleteEgreso = async (id) => {
    await eliminarTransaccion(id);
    await cargarEgresos();
  };

  const total = lista.reduce((acc, t) => acc + t.monto, 0);
  const formatCurrency = (n) => `$${n.toLocaleString()}`;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Egresos</Text>
        <Text style={styles.headerSubtitle}>{fechaActual}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Card Total */}
        <View style={styles.totalCard}>
          <View style={styles.totalCardContent}>
            <Text style={styles.totalLabel}>Egresos del mes</Text>
            <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
          </View>
          <View style={styles.totalCardIcon}>
            <MaterialCommunityIcons name="trending-down" size={32} color="#F10004" />
          </View>
        </View>

        {/* Transacciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transacciones</Text>
          
          {lista.length > 0 ? (
            lista.map((item, index) => (
              <View key={item.id} style={[styles.transactionCard, index === lista.length - 1 && styles.transactionCardLast]}>
                <View style={styles.transactionLeft}>
                  <View style={styles.transactionIcon}>
                    <MaterialCommunityIcons name="cash-minus" size={20} color="#F10004" />
                  </View>
                  <View>
                    <Text style={styles.transactionTitle}>{item.titulo}</Text>
                    <Text style={styles.transactionDate}>{item.fecha}</Text>
                  </View>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={styles.transactionAmount}>{formatCurrency(item.monto)}</Text>
                  <TouchableOpacity onPress={() => deleteEgreso(item.id)} style={styles.deleteButton}>
                    <MaterialCommunityIcons name="trash-can-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="inbox-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>No hay egresos registrados</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons name="plus" size={28} color="white" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo Egreso</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Concepto</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Comida, Transporte..."
                value={titulo}
                onChangeText={setTitulo}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Cantidad</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                value={cantidad}
                onChangeText={setCantidad}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.buttonCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonSave} onPress={addEgreso}>
                <Text style={styles.buttonSaveText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F5F5F5" 
  },
  
  header: { 
    backgroundColor: "#1C5E20", 
    paddingHorizontal: 16, 
    paddingTop: 20, 
    paddingBottom: 24,
  },
  
  headerTitle: { 
    fontSize: 28, 
    fontWeight: "700", 
    color: "#fff", 
    marginBottom: 4 
  },
  
  headerSubtitle: { 
    fontSize: 14, 
    color: "rgba(255,255,255,0.9)" 
  },
  
  body: { 
    paddingHorizontal: 16, 
    paddingVertical: 16,
    paddingBottom: 100,
  },
  
  totalCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  
  totalCardContent: {
    flex: 1,
  },
  
  totalLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
    marginBottom: 4,
  },
  
  totalAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F10004",
  },
  
  totalCardIcon: {
    marginLeft: 16,
  },
  
  section: {
    marginBottom: 16,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C5E20",
    marginBottom: 12,
  },
  
  transactionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  
  transactionCardLast: {
    borderBottomWidth: 0,
  },
  
  transactionLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#FFEBEE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  
  transactionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  
  transactionDate: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  
  transactionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F10004",
  },
  
  deleteButton: {
    padding: 4,
  },
  
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  
  emptyStateText: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 8,
  },
  
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1C5E20",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1C5E20",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 32,
  },
  
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C5E20",
    marginBottom: 20,
    textAlign: "center",
  },
  
  inputGroup: {
    marginBottom: 16,
  },
  
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#1F2937",
  },
  
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  
  buttonCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  
  buttonCancelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  
  buttonSave: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#1C5E20",
    alignItems: "center",
    shadowColor: "#1C5E20",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  
  buttonSaveText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
