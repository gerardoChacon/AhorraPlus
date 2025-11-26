import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function IngresosScreen() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>A+</Text>
      </View>

      {/* TABS */}
      <View style={styles.tabs}>
        <Text style={styles.tab}>Gastos</Text>
        <Text style={[styles.tab, styles.activeTab]}>Ingresos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.month}>Oct</Text>
        <Text style={styles.date}>Hoy, 30 de Octubre</Text>

        {/* GRÁFICO */}
        <View style={styles.chart}>
          <Text style={styles.chartText}>$30,500</Text>
        </View>
        <Text style={styles.percentText}>+12% de ingresos este mes</Text>

        {/* LISTA CRUD ESTÉTICO */}
        <View style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>Nómina</Text>
            <Text style={styles.cardAmount}>$12,300.00</Text>
          </View>
          <View style={styles.cardButtons}>
            <Feather name="edit" size={22} color="#0E5B10" />
            <Feather name="trash-2" size={22} color="#cc0000" />
          </View>
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>Negocio</Text>
            <Text style={styles.cardAmount}>$6,000.00</Text>
          </View>
          <View style={styles.cardButtons}>
            <Feather name="edit" size={22} color="#0E5B10" />
            <Feather name="trash-2" size={22} color="#cc0000" />
          </View>
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>Intereses</Text>
            <Text style={styles.cardAmount}>$1,200.00</Text>
          </View>
          <View style={styles.cardButtons}>
            <Feather name="edit" size={22} color="#0E5B10" />
            <Feather name="trash-2" size={22} color="#cc0000" />
          </View>
        </View>
      </ScrollView>

      {/* BOTÓN CREAR */}
      <TouchableOpacity style={styles.plusButton}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },

  header: {
    backgroundColor: "#0E5B10",
    padding: 20,
    alignItems: "flex-end",
  },
  headerText: { color: "#fff", fontSize: 24, fontWeight: "bold" },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#e8e8e8",
    paddingVertical: 10,
  },
  tab: { fontSize: 16, color: "#555" },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#0E5B10",
    color: "#0E5B10",
    fontWeight: "bold",
  },

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
  chartText: { fontSize: 24 },
  percentText: { textAlign: "center", color: "#888", marginBottom: 20 },

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
  cardAmount: { color: "#0E5B10", fontSize: 16, marginTop: 5 },

  cardButtons: {
    flexDirection: "row",
    gap: 15,
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
  plus: { color: "#fff", fontSize: 32 },
});
