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
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  const formatCurrency = (n) => `$${n.toLocaleString()}`;

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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Presupuestos</Text>
        <Text style={styles.headerSubtitle}>Gestiona tus límites mensuales</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Card de límite configurable */}
        <View style={styles.limitCard}>
          <Text style={styles.limitLabel}>Presupuesto Límite</Text>
          <TextInput
            style={styles.limitInput}
            placeholder="5000"
            keyboardType="numeric"
            value={limite}
            onChangeText={setLimite}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Card Total */}
        <View style={styles.totalCard}>
          <View style={styles.totalCardContent}>
            <Text style={styles.totalLabel}>Total Presupuestado</Text>
            <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
            <Text style={styles.limitIndicator}>
              Límite: {formatCurrency(parseFloat(limite))}
            </Text>
          </View>
          <View style={styles.totalCardIcon}>
            <MaterialCommunityIcons name="chart-pie" size={32} color="#1C5E20" />
          </View>
        </View>

        {/* Filtros */}
        <View style={styles.filtersSection}>
          <Text style={styles.filterTitle}>Filtros</Text>
          <View style={styles.filterGroup}>
            <TextInput
              style={styles.filterInput}
              placeholder="Categoría"
              value={filtroCategoria}
              onChangeText={setFiltroCategoria}
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              style={styles.filterInput}
              placeholder="YYYY-MM-DD"
              value={filtroFecha}
              onChangeText={setFiltroFecha}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Lista */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Presupuestos ({lista.length})</Text>
          
          {lista.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="inbox-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>No hay presupuestos registrados</Text>
            </View>
          ) : (
            lista.map((item, index) => (
              <View key={item.id} style={[styles.budgetCard, index === lista.length - 1 && styles.budgetCardLast]}>
                <View style={styles.budgetLeft}>
                  <View style={styles.budgetIcon}>
                    <MaterialCommunityIcons name="tag-outline" size={20} color="#1C5E20" />
                  </View>
                  <View style={styles.budgetInfo}>
                    <Text style={styles.budgetCategory}>{item.categoria}</Text>
                    <Text style={styles.budgetDate}>{item.fecha}</Text>
                  </View>
                </View>
                <View style={styles.budgetRight}>
                  <Text style={styles.budgetAmount}>{formatCurrency(item.monto)}</Text>
                  <View style={styles.budgetActions}>
                    <TouchableOpacity
                      onPress={() => {
                        setEditId(item.id);
                        setMonto(item.monto.toString());
                        setCategoria(item.categoria);
                        setFecha(item.fecha);
                        setModalVisible(true);
                      }}
                      style={styles.actionButton}
                    >
                      <MaterialCommunityIcons name="pencil-outline" size={16} color="#1C5E20" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => borrar(item.id)}
                      style={styles.actionButton}
                    >
                      <MaterialCommunityIcons name="trash-can-outline" size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setMonto("");
          setCategoria("");
          setFecha("");
          setEditId(null);
          setModalVisible(true);
        }}
      >
        <MaterialCommunityIcons name="plus" size={28} color="white" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editId ? "Editar Presupuesto" : "Nuevo Presupuesto"}
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Monto</Text>
              <TextInput
                style={styles.input}
                placeholder="1500"
                keyboardType="numeric"
                value={monto}
                onChangeText={setMonto}
                placeholderTextColor="#9CA3AF"
                returnKeyType="done"
                blurOnSubmit={true}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Categoría</Text>
              <TextInput
                style={styles.input}
                placeholder="Comida, Transporte, etc"
                value={categoria}
                onChangeText={setCategoria}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Fecha</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={fecha}
                onChangeText={setFecha}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.buttonCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonSave} onPress={guardar}>
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
  
  limitCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  
  limitLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
    marginBottom: 8,
  },
  
  limitInput: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "600",
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
    color: "#1C5E20",
  },
  
  limitIndicator: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 4,
  },
  
  totalCardIcon: {
    marginLeft: 16,
  },
  
  filtersSection: {
    marginBottom: 16,
  },
  
  filterTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  
  filterGroup: {
    gap: 8,
  },
  
  filterInput: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1F2937",
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
  
  budgetCard: {
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
  
  budgetCardLast: {
    borderBottomWidth: 0,
  },
  
  budgetLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  
  budgetIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  
  budgetInfo: {
    flex: 1,
  },
  
  budgetCategory: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  
  budgetDate: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  
  budgetRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  
  budgetAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1C5E20",
  },
  
  budgetActions: {
    flexDirection: "row",
    gap: 8,
  },
  
  actionButton: {
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
