import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AccountCard = ({ account, onEdit, onDelete }) => (
  <View style={styles.accountCard}>
    <View style={[styles.accountIcon, { backgroundColor: account.color }]}>
      <MaterialCommunityIcons name={account.icon} size={22} color="white" />
    </View>
    <View style={styles.accountInfo}>
      <Text style={styles.accountName}>{account.name}</Text>
      <Text style={styles.accountBalance}>${account.balance}</Text>
    </View>
    <View style={styles.actions}>
      <Pressable onPress={() => onEdit(account)}>
        <MaterialCommunityIcons name="pencil" size={18} color="#1C5E20" />
      </Pressable>
      <Pressable onPress={() => onDelete(account)}>
        <MaterialCommunityIcons name="delete" size={18} color="#dc2626" />
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
    backgroundColor: "#ffffff",
  },
  accountCard: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  accountIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  accountInfo: {
    flex: 1,
    marginLeft: 12,
  },
  accountName: {
    fontSize: 15,
    fontWeight: "500",
  },
  accountBalance: {
    fontSize: 14,
    color: "#64748b",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AccountsList;