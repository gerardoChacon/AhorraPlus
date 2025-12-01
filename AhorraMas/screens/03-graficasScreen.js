import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Alert, Modal, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { obtenerTransaccionesPorCategoria, obtenerIngresosPorMes, obtenerEgresosPorMes, obtenerIngresosPor6Meses, obtenerEgresosPor6Meses } from "../controllers/transaccion.controller";
import { obtenerCuentas, actualizarCuenta, eliminarCuenta, agregarCuenta } from "../controllers/cuenta.controller";
import styles from "./styles/HomeStyles";
import AccountsList from "../components/AccountsList";
import AccountsChart from "../components/AccountsChart";

const ACCOUNT_COLORS = [
  "#c30c1bff", 
  "#F77F00", 
  "#FCBF49", 
  "#128046ff", 
  "#0077B6", 
  "#501875ff", 
  "#bc0b5aff", 
  "#0790a8ff", 
  "#1c4989ff",
  "#c052b5ff"  
];

// Iconos disponibles para cuentas
const ACCOUNT_ICONS = [
  "bank", "piggy-bank", "wallet", "credit-card", "cash", 
  "briefcase", "shopping", "heart", "phone-mobile", "car"
];

export default function HomeScreen() {
  // Estado para cuentas
  const [accounts, setAccounts] = useState([]);
  
  // Estado para edición
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [editName, setEditName] = useState("");
  const [editBalance, setEditBalance] = useState("");
  const [editColor, setEditColor] = useState("#1C5E20");
  const [editIcon, setEditIcon] = useState("bank");
  
  // Estado para agregar cuenta
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountBalance, setNewAccountBalance] = useState("");
  const [newAccountColor, setNewAccountColor] = useState("#1C5E20");
  const [newAccountIcon, setNewAccountIcon] = useState("bank");
  
  // Estado para gráficas
  const [ingresosDelMes, setIngresosDelMes] = useState(0);
  const [egresosDelMes, setEgresosDelMes] = useState(0);
  const [ingresos6Meses, setIngresos6Meses] = useState([]);
  const [egresos6Meses, setEgresos6Meses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar cuentas desde la base de datos
  useEffect(() => {
    const cargarCuentas = async () => {
      try {
        const cuentas = await obtenerCuentas();
        setAccounts(cuentas || []);
      } catch (error) {
        console.log("Error al cargar cuentas:", error);
      }
    };
    cargarCuentas();
  }, []);

  // Función para cargar datos de transacciones y gráficas
  const cargarDatos = useCallback(async () => {
    try {
      // Obtener datos del mes actual
      const ingresosDelMesActual = await obtenerIngresosPorMes();
      const egresosDelMesActual = await obtenerEgresosPorMes();
      const ingresos6M = await obtenerIngresosPor6Meses();
      const egresos6M = await obtenerEgresosPor6Meses();
      
      setIngresosDelMes(ingresosDelMesActual || 0);
      setEgresosDelMes(egresosDelMesActual || 0);
      setIngresos6Meses(ingresos6M || []);
      setEgresos6Meses(egresos6M || []);
      setLoading(false);
    } catch (error) {
      console.log("Error al cargar datos:", error);
      setLoading(false);
    }
  }, []);

  // Cargar datos al montar el componente
  useEffect(() => {
    setLoading(true);
    cargarDatos();
  }, [cargarDatos]);

  // Recargar datos cada vez que la pantalla se enfoca (vuelve desde Ingresos/Egresos)
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      cargarDatos();
    }, [cargarDatos])
  );

  const formatCurrency = (n) => `$${n.toLocaleString()}`;

  // Calcular balance total de cuentas
  const total = accounts.reduce((sum, account) => sum + account.balance, 0);

  // Paleta de colores vibrante para gráficas - Idéntica a ACCOUNT_COLORS para consistencia
  const paletaColoresVibrantes = ACCOUNT_COLORS;

  // Preparar datos para la gráfica de cuentas (estilo colorido)
  // Usar el color de cada cuenta si existe, sino usar la paleta
  const cuentasChartData = {
    labels: accounts.length > 0 ? accounts.map((a) => a.name) : ["Sin cuentas"],
    datasets: [
      {
        data: accounts.length > 0 ? accounts.map((a) => a.balance) : [0],
      },
    ],
    colors: accounts.length > 0 ? accounts.map((a) => a.color || paletaColoresVibrantes[accounts.indexOf(a) % paletaColoresVibrantes.length]) : ["#999999"],
  };

  // Gráfica comparativa de ingresos vs egresos de los últimos 6 meses
  const generarEtiquetasMeses = () => {
    const mesesNombres = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    
    // Crear array de últimos 6 meses
    const ahora = new Date();
    const meses = [];
    for (let i = 5; i >= 0; i--) {
      const fecha = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
      meses.push({
        mes: fecha.getMonth() + 1,
        año: fecha.getFullYear(),
        label: mesesNombres[fecha.getMonth()]
      });
    }
    return meses;
  };

  const obtenerDatosPorMes = (datos, mesObj) => {
    const dato = datos.find(d => 
      parseInt(d.mes) === mesObj.mes && 
      parseInt(d.año) === mesObj.año
    );
    return dato ? dato.total : 0;
  };

  const mesesData = generarEtiquetasMeses();
  const ingresosArray = mesesData.map(m => obtenerDatosPorMes(ingresos6Meses, m));
  const egresosArray = mesesData.map(m => Math.abs(obtenerDatosPorMes(egresos6Meses, m)));

  const comparativaDelMesChartData = {
    labels: mesesData.map(m => m.label),
    datasets: [
      {
        data: ingresosArray,
        color: (opacity = 1) => `rgba(52, 211, 153, ${opacity})`,
        strokeWidth: 3,
      },
      {
        data: egresosArray,
        color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
        strokeWidth: 3,
      },
    ],
    colors: ["#ff1900ff", "#ff9100ff","#FFD93D","#00d9ffff","#10d809ff","#a20fa8ff" ],
  };

  // Calcular balance (diferencia)
  const balance = ingresosDelMes - Math.abs(egresosDelMes);
  const balanceEsPositivo = balance >= 0;

  // Abrir modal de edición
  const handleEditAccount = (account) => {
    setSelectedAccount(account);
    setEditName(account.name);
    setEditBalance(account.balance.toString());
    setEditColor(account.color || "#1C5E20");
    setEditIcon(account.icon || "bank");
    setEditModalVisible(true);
  };

  // Eliminar cuenta
  const handleDeleteAccount = async (account) => {
    Alert.alert(
      "Eliminar cuenta",
      `¿Estás seguro de que deseas eliminar la cuenta ${account.name}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await eliminarCuenta(account.id);
              const cuentas = await obtenerCuentas();
              setAccounts(cuentas || []);
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la cuenta");
            }
          },
        },
      ]
    );
  };

  // Actualizar cuenta en la base de datos
  const handleUpdateAccount = async () => {
    if (!selectedAccount) return;
    if (!editName.trim() || !editBalance.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    const cuentaActualizada = {
      ...selectedAccount,
      name: editName,
      balance: parseFloat(editBalance),
      color: editColor,
      icon: editIcon,
    };
    try {
      await actualizarCuenta(cuentaActualizada);
      // Refrescar cuentas
      const cuentas = await obtenerCuentas();
      setAccounts(cuentas || []);
      setEditModalVisible(false);
      setSelectedAccount(null);
      Alert.alert("Éxito", "Cuenta actualizada correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar la cuenta");
    }
  };

  // Agregar nueva cuenta
  const handleAddAccount = async () => {
    if (!newAccountName.trim() || !newAccountBalance.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    const nuevaCuenta = {
      name: newAccountName,
      balance: parseFloat(newAccountBalance),
      color: newAccountColor,
      icon: newAccountIcon,
    };
    try {
      await agregarCuenta(nuevaCuenta);
      // Refrescar cuentas
      const cuentas = await obtenerCuentas();
      setAccounts(cuentas || []);
      setAddModalVisible(false);
      setNewAccountName("");
      setNewAccountBalance("");
      setNewAccountColor("#1C5E20");
      setNewAccountIcon("bank");
      Alert.alert("Éxito", "Cuenta agregada correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudo agregar la cuenta");
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: "#f5f5f5" }]}>
      {/* Header */}
      <View style={{ backgroundColor: "#1C5E20", paddingHorizontal: 16, paddingTop: 20, paddingBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "700", color: "white", marginBottom: 4 }}>Hola, Usuario</Text>
        <Text style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>Bienvenido de nuevo</Text>
      </View>

      {/* Card de balance total */}
      <View style={{ paddingHorizontal: 16, marginTop: -10, marginBottom: 16 }}>
        <View style={{ 
          backgroundColor: "white", 
          borderRadius: 16, 
          padding: 16,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 3
        }}>
          <Text style={{ fontSize: 12, color: "#999", fontWeight: "500", marginBottom: 4 }}>Balance Total</Text>
          <Text style={{ fontSize: 28, fontWeight: "700", color: "#1C5E20" }}>{formatCurrency(total)}</Text>
        </View>
      </View>

      {/* Sección de gráficas */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        {/* Gráfica Comparativa de Ingresos vs Egresos */}
        <View style={{ 
          backgroundColor: "white", 
          borderRadius: 16, 
          padding: 16,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 3
        }}>
          <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 16, color: "#1C5E20" }}>
            Comparativa del mes
          </Text>
          
          {/* Tarjetas de resumen */}
          <View style={{ flexDirection: "row", marginBottom: 16, gap: 8 }}>
            {/* Ingresos */}
            <View style={{ 
              flex: 1, 
              backgroundColor: "#E8F5E9", 
              borderRadius: 12, 
              padding: 12,
              borderLeftWidth: 4,
              borderLeftColor: "#07DF90"
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <MaterialCommunityIcons name="trending-up" size={16} color="#07DF90" />
                <Text style={{ fontSize: 11, color: "#666", marginLeft: 4, fontWeight: "600" }}>Ingresos</Text>
              </View>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#07DF90" }}>
                {formatCurrency(ingresosDelMes)}
              </Text>
            </View>

            {/* Egresos */}
            <View style={{ 
              flex: 1, 
              backgroundColor: "#FFEBEE", 
              borderRadius: 12, 
              padding: 12,
              borderLeftWidth: 4,
              borderLeftColor: "#F10004"
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <MaterialCommunityIcons name="trending-down" size={16} color="#F10004" />
                <Text style={{ fontSize: 11, color: "#666", marginLeft: 4, fontWeight: "600" }}>Egresos</Text>
              </View>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#F10004" }}>
                {formatCurrency(Math.abs(egresosDelMes))}
              </Text>
            </View>
          </View>

          {/* Balance neto */}
          <View style={{ 
            backgroundColor: balanceEsPositivo ? "#E8F5E9" : "#FFEBEE", 
            borderRadius: 12, 
            padding: 12,
            marginBottom: 16,
            borderWidth: 2,
            borderColor: balanceEsPositivo ? "#07DF90" : "#F10004"
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View>
                <Text style={{ fontSize: 11, color: "#666", marginBottom: 4, fontWeight: "600" }}>Balance del mes</Text>
                <Text style={{ fontSize: 20, fontWeight: "700", color: balanceEsPositivo ? "#07DF90" : "#F10004" }}>
                  {formatCurrency(Math.abs(balance))}
                </Text>
              </View>
              <MaterialCommunityIcons 
                name={balanceEsPositivo ? "emoticon-happy-outline" : "emoticon-sad-outline"} 
                size={32} 
                color={balanceEsPositivo ? "#07DF90" : "#F10004"} 
              />
            </View>
            <Text style={{ fontSize: 10, color: "#666", marginTop: 4 }}>
              {balanceEsPositivo ? "¡Excelente! Tus ingresos superan tus gastos" : "Cuidado: Estás gastando más de lo que ganas"}
            </Text>
          </View>

          {/* Gráfica de barras comparativa */}
          <AccountsChart data={comparativaDelMesChartData} />
        </View>

        {/* Gráfica de Cuentas (estilo colorido) */}
        <View style={{ 
          backgroundColor: "white", 
          borderRadius: 16, 
          padding: 16,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 3
        }}>
          <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 12, color: "#1C5E20" }}>
            Distribución de cuentas
          </Text>
          {accounts.length > 0 ? (
            <AccountsChart data={cuentasChartData} />
          ) : (
            <Text style={{ textAlign: "center", color: "#999", fontSize: 12, paddingVertical: 20 }}>No hay cuentas registradas</Text>
          )}
        </View>
      </View>

      {loading && <Text style={{ textAlign: "center", color: "#999", marginVertical: 10 }}>Cargando datos...</Text>}

      {/* Sección de cuentas */}
      <View style={{ paddingHorizontal: 16, marginBottom: 100 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Text style={{ fontWeight: "700", fontSize: 16, color: "#1C5E20" }}>
            Tus cuentas
          </Text>
          <TouchableOpacity 
            onPress={() => setAddModalVisible(true)}
            style={{ 
              backgroundColor: "#1C5E20", 
              width: 40, 
              height: 40, 
              borderRadius: 20, 
              justifyContent: "center", 
              alignItems: "center" 
            }}
          >
            <MaterialCommunityIcons name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <AccountsList
          accounts={accounts}
          onEdit={handleEditAccount}
          onDelete={handleDeleteAccount}
        />
      </View>

      {/* Modal de edición */}
      <Modal visible={editModalVisible} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                padding: 24,
                width: "85%",
                maxWidth: 350,
                shadowColor: "#000",
                shadowOpacity: 0.25,
                shadowOffset: { width: 0, height: 5 },
                shadowRadius: 15,
                elevation: 10,
              }}
            >
            <Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 20, color: "#1C5E20" }}>
              Editar cuenta
            </Text>

            <Text style={{ marginBottom: 8, fontWeight: "600", fontSize: 13, color: "#333" }}>Nombre:</Text>
            <TextInput
              value={editName}
              onChangeText={setEditName}
              style={{
                borderWidth: 1,
                borderColor: "#e0e0e0",
                marginBottom: 16,
                padding: 12,
                borderRadius: 10,
                fontSize: 14,
                color: "#333",
              }}
              placeholderTextColor="#ccc"
            />

            <Text style={{ marginBottom: 8, fontWeight: "600", fontSize: 13, color: "#333" }}>Balance:</Text>
            <TextInput
              value={editBalance}
              onChangeText={setEditBalance}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: "#e0e0e0",
                marginBottom: 24,
                padding: 12,
                borderRadius: 10,
                fontSize: 14,
                color: "#333",
              }}
              placeholderTextColor="#ccc"
            />

            <Text style={{ marginBottom: 8, fontWeight: "600", fontSize: 13, color: "#333" }}>Color:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {ACCOUNT_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setEditColor(color)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: color,
                    borderWidth: editColor === color ? 3 : 0,
                    borderColor: "#333",
                  }}
                />
              ))}
            </View>

            <Text style={{ marginBottom: 8, fontWeight: "600", fontSize: 13, color: "#333" }}>Icono:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {ACCOUNT_ICONS.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  onPress={() => setEditIcon(icon)}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 8,
                    backgroundColor: editIcon === icon ? "#1C5E20" : "#f0f0f0",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: editIcon === icon ? 2 : 0,
                    borderColor: "#1C5E20",
                  }}
                >
                  <MaterialCommunityIcons 
                    name={icon} 
                    size={24} 
                    color={editIcon === icon ? "white" : "#333"} 
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
              <TouchableOpacity
                onPress={handleUpdateAccount}
                style={{
                  backgroundColor: "#1C5E20",
                  paddingVertical: 12,
                  borderRadius: 10,
                  flex: 1,
                  shadowColor: "#1C5E20",
                  shadowOpacity: 0.2,
                  shadowOffset: { width: 0, height: 3 },
                  shadowRadius: 6,
                  elevation: 3,
                }}
              >
                <Text style={{ color: "white", textAlign: "center", fontWeight: "600", fontSize: 14 }}>
                  Actualizar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                style={{
                  backgroundColor: "#f0f0f0",
                  paddingVertical: 12,
                  borderRadius: 10,
                  flex: 1,
                }}
              >
                <Text style={{ textAlign: "center", fontWeight: "600", fontSize: 14, color: "#333" }}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
            </ScrollView>
        </View>
      </Modal>

      {/* Modal para agregar cuenta */}
      <Modal visible={addModalVisible} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                padding: 24,
                width: "85%",
                maxWidth: 350,
                shadowColor: "#000",
                shadowOpacity: 0.25,
                shadowOffset: { width: 0, height: 5 },
                shadowRadius: 15,
                elevation: 10,
              }}
            >
            <Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 20, color: "#1C5E20" }}>
              Agregar cuenta
            </Text>

            <Text style={{ marginBottom: 8, fontWeight: "600", fontSize: 13, color: "#333" }}>Nombre:</Text>
            <TextInput
              value={newAccountName}
              onChangeText={setNewAccountName}
              placeholder="Ej: Mi Banco"
              style={{
                borderWidth: 1,
                borderColor: "#e0e0e0",
                marginBottom: 16,
                padding: 12,
                borderRadius: 10,
                fontSize: 14,
                color: "#333",
              }}
              placeholderTextColor="#ccc"
            />

            <Text style={{ marginBottom: 8, fontWeight: "600", fontSize: 13, color: "#333" }}>Balance inicial:</Text>
            <TextInput
              value={newAccountBalance}
              onChangeText={setNewAccountBalance}
              placeholder="Ej: 5000"
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: "#e0e0e0",
                marginBottom: 24,
                padding: 12,
                borderRadius: 10,
                fontSize: 14,
                color: "#333",
              }}
              placeholderTextColor="#ccc"
            />

            <Text style={{ marginBottom: 8, fontWeight: "600", fontSize: 13, color: "#333" }}>Color:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {ACCOUNT_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setNewAccountColor(color)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: color,
                    borderWidth: newAccountColor === color ? 3 : 0,
                    borderColor: "#333",
                  }}
                />
              ))}
            </View>

            <Text style={{ marginBottom: 8, fontWeight: "600", fontSize: 13, color: "#333" }}>Icono:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {ACCOUNT_ICONS.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  onPress={() => setNewAccountIcon(icon)}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 8,
                    backgroundColor: newAccountIcon === icon ? "#1C5E20" : "#f0f0f0",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: newAccountIcon === icon ? 2 : 0,
                    borderColor: "#1C5E20",
                  }}
                >
                  <MaterialCommunityIcons 
                    name={icon} 
                    size={24} 
                    color={newAccountIcon === icon ? "white" : "#333"} 
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
              <TouchableOpacity
                onPress={handleAddAccount}
                style={{
                  backgroundColor: "#1C5E20",
                  paddingVertical: 12,
                  borderRadius: 10,
                  flex: 1,
                  shadowColor: "#1C5E20",
                  shadowOpacity: 0.2,
                  shadowOffset: { width: 0, height: 3 },
                  shadowRadius: 6,
                  elevation: 3,
                }}
              >
                <Text style={{ color: "white", textAlign: "center", fontWeight: "600", fontSize: 14 }}>
                  Agregar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAddModalVisible(false)}
                style={{
                  backgroundColor: "#f0f0f0",
                  paddingVertical: 12,
                  borderRadius: 10,
                  flex: 1,
                }}
              >
                <Text style={{ textAlign: "center", fontWeight: "600", fontSize: 14, color: "#333" }}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
            </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
}