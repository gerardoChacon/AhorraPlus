// screens/egresos.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

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
        {/* MES Y FECHA */}
        <Text style={styles.month}>Oct</Text>
        <Text style={styles.date}>Hoy, 30 de Octubre</Text>

        {/* GRÁFICO (placeholder) */}
        <View style={styles.chart}>
          <Text style={styles.chartText}>$30,500</Text>
        </View>
        <Text style={styles.percentText}>+8% de ingresos este mes</Text>

        {/* LISTA DE GASTOS */}
        <View style={styles.card}>
          <Text style={styles.cardText}>Nomina <Text style={{ color: '#FF7A7A' }}>$762.00</Text></Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Negocio <Text style={{ color: '#FFC400' }}>$6000.00</Text></Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Préstamos <Text style={{ color: '#FFB03A' }}>$527.00</Text></Text>
        </View>
      </ScrollView>

      {/* BOTÓN "+" */}
      <TouchableOpacity style={styles.plusButton}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#f4f4f4'
  }, 
  header: { 
    backgroundColor: '#0E5B10', 
    padding: 20, 
    alignItems: 'flex-end' 
  },
  headerText: { 
    color: '#fff', fontSize: 24, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#e8e8e8', paddingVertical: 10 },
  tab: { fontSize: 16, color: '#555' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#0E5B10', color: '#0E5B10', fontWeight: 'bold' },
  body: { padding: 20 },
  month: { fontSize: 18, fontWeight: 'bold', color: '#0E5B10' },
  date: { color: '#999', marginBottom: 15 },
  chart: { width: 200, height: 200, borderRadius: 100, backgroundColor: '#eee', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  chartText: { fontSize: 24 },
  percentText: { textAlign: 'center', color: '#888', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 },
  cardText: { fontSize: 16 },
  plusButton: { backgroundColor: '#0E5B10', width: 60, height: 60, borderRadius: 30, position: 'absolute', bottom: 25, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
  plus: { color: '#fff', fontSize: 32 },
});
