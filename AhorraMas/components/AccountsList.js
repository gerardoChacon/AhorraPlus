import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AccountCard = ({ account, onEdit, onDelete, onUpdate }) => (
  <View style={styles.accountCard}>
    <View style={[styles.accountIcon, { backgroundColor: account.color }]}>
      <MaterialCommunityIcons name={account.icon} size={22} color="white" />
    </View>
    <View style={styles.accountInfo}>
      <Text style={styles.accountName}>{account.name}</Text>
      <Text style={styles.accountBalance}>${account.balance}</Text>
    </View>
    <View style={styles.actions}>
      <Pressable
        onPress={() => onEdit(account)}
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.actionButtonPressed,
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 5 }}
      >
        <MaterialCommunityIcons name="pencil" size={18} color="#1C5E20" />
      </Pressable>
      <Pressable
        onPress={() => onUpdate(account)}
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.actionButtonPressed,
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
      >
        <MaterialCommunityIcons name="refresh" size={18} color="#1C5E20" />
      </Pressable>
      <Pressable
        onPress={() => onDelete(account)}
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.actionButtonPressed,
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 5, right: 10 }}
      >
        <MaterialCommunityIcons name="delete" size={18} color="#dc2626" />
      </Pressable>
    </View>
  </View>
);

const AccountsList = ({ accounts = [], onEdit, onDelete, onUpdate }) => (
  <ScrollView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Lista de cuentas</Text>
      <TouchableOpacity style={styles.addButton}>
        <MaterialCommunityIcons name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>

    {accounts.map((account) => (
      <AccountCard
        key={account.id}
        account={account}
        onEdit={onEdit}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C5E20",
  },
  addButton: {
    backgroundColor: "#1C5E20",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      },
      android: {
        elevation: 2,
      },
    }),
  },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    color: "#1f2937",
    marginBottom: 2,
  },
  accountBalance: {
    fontSize: 14,
    color: "#64748b",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
    borderRadius: 6,
  },
  actionButtonPressed: {
    backgroundColor: "#f1f5f9",
  },
});

export default AccountsList;