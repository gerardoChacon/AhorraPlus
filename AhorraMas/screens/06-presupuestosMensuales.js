import React from "react";
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function PresupuestoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Presupuestos</Text>

        <View style={styles.logoPlaceholder}>
          <Image source={require("../assets/logoAhorraMas.png")} style={{ width: 30, height: 30 }} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Gestión de presupuestos</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Límite Diario:</Text>
          <TextInput style={styles.input} value="3000" editable={false} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Límite Semanal:</Text>
          <TextInput style={styles.input} value="3000" editable={false} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Límite Mensual:</Text>
          <TextInput style={styles.input} value="3000" editable={false} />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>GUARDAR CAMBIOS</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#1B4D1B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    fontSize: 24,
    color: "#fff",
  },
  title: {
    color: "#000000ff",
    fontSize: 20,
    fontWeight: "600",
  },
  logoPlaceholder: {
    width: 30,
    height: 30,
    backgroundColor: "transparent",
  },
  content: {
    width: "90%",
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
    color: "#555",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#1B4D1B",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});