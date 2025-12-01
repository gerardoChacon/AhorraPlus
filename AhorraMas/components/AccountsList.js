import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AccountCard = ({ account, onEdit, onDelete }) => (
  <View style={styles.accountCard}>
    <View style={[styles.accountIcon, { backgroundColor: account.color }]}>
      <MaterialCommunityIcons name={account.icon} size={24} color="white" />
    </View>
    <View style={styles.accountInfo}>
      <Text style={styles.accountName}>{account.name}</Text>
      <Text style={styles.accountBalance}>${account.balance.toLocaleString()}</Text>
    </View>
    <View style={styles.actions}>
      <Pressable onPress={() => onEdit(account)} style={{ marginRight: 12 }}>
        <MaterialCommunityIcons name="pencil" size={20} color="#1C5E20" />
      </Pressable>
      <Pressable onPress={() => onDelete(account)}>
        <MaterialCommunityIcons name="delete" size={20} color="#dc2626" />
      </Pressable>
    </View>
  </View>
);



const AccountsList = ({ accounts, onEdit, onDelete }) => (
  <ScrollView style={styles.container}>
    {accounts.map((account) => (
      <AccountCard
        key={account.id}
        account={account}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  accountCard: {
    flexDirection: "row",
    padding: 14,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  accountIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  accountInfo: {
    flex: 1,
    marginLeft: 12,
  },
  accountName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C5E20",
  },
  accountBalance: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AccountsList;