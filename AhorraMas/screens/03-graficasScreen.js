import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import styles from "./styles/HomeStyles";
import AccountsList from "../components/AccountsList";
import AccountsChart from "../components/AccountsChart";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [accounts, setAccounts] = useState([
    {
      id: "1",
      name: "Banco",
      balance: 6000,
      color: "#F10004",
      icon: "bank",
    },
    {
      id: "2",
      name: "Ahorros",
      balance: 3000,
      color: "#FFB200",
      icon: "piggy-bank",
    },
    {
      id: "3",
      name: "Tarjetacred1",
      balance: 2500,
      color: "#FFEA00",
      icon: "credit-card",
    },
    {
      id: "4",
      name: "Tarjetacred2",
      balance: 2000,
      color: "#0099FF",
      icon: "credit-card-outline",
    },
    {
      id: "5",
      name: "Paypal",
      balance: 1500,
      color: "#0081F1",
      icon: "cash",
    },
    {
      id: "6",
      name: "TarjetaDeb",
      balance: 1503,
      color: "#07DF90",
      icon: "credit-card-check",
    },
  ]);

  const total = accounts.reduce((sum, account) => sum + account.balance, 0);
  const formatCurrency = (n) => `$${n.toLocaleString()}`;

  // CRUD Operations
  const handleEditAccount = (account) => {
    Alert.alert("Editar cuenta", "Esta funcionalidad está en desarrollo", [
      { text: "OK" },
    ]);
  };

  const handleDeleteAccount = (account) => {
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
          onPress: () => {
            setAccounts(accounts.filter((a) => a.id !== account.id));
          },
        },
      ]
    );
  };

  const handleUpdateAccount = (account) => {
    Alert.alert("Actualizar cuenta", "Esta funcionalidad está en desarrollo", [
      { text: "OK" },
    ]);
  };

  const chartData = {
    labels: accounts.map((a) => a.name),
    datasets: [
      {
        data: accounts.map((a) => a.balance),
      },
    ],
    colors: accounts.map((a) => a.color),
  };

  return (

    <View style={styles.container}>
        
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Hola, Usuario</Text>
          <Text style={styles.headerSubtitle}>Bienvenido de nuevo</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Balance: {formatCurrency(total)}
        </Text>
      </View>

      <View style={styles.chartSection}>
        <AccountsChart data={chartData} />
      </View>
      

      <View style={styles.accountsSection}>
        <AccountsList
          accounts={accounts}
          onEdit={handleEditAccount}
          onDelete={handleDeleteAccount}
          onUpdate={handleUpdateAccount}
        />
      </View>
    </View>
  );
}