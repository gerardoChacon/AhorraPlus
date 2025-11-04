import { StyleSheet, Platform } from "react-native";
import { COLORS, SPACING } from "./theme";

// Styles for Home screen using shared theme tokens
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: SPACING.base,
    marginHorizontal: SPACING.base,
    marginTop: 10,
    borderRadius: 12,
    marginBottom: SPACING.base,
    ...Platform.select({
      ios: {
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      },
      android: {
        elevation: 3,
      },
    }),
  },
  chartSection: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginHorizontal: SPACING.base,
    marginBottom: SPACING.base,
    padding: SPACING.base,
    ...Platform.select({
      ios: {
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      },
      android: {
        elevation: 3,
      },
    }),
  },
  accountsSection: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginHorizontal: SPACING.base,
    marginBottom: SPACING.base,
    ...Platform.select({
      ios: {
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      },
      android: {
        elevation: 3,
      },
    }),
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  accountList: {
    borderRadius: 12,
    padding: SPACING.small,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.base,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  C1: {
    padding: 0,
    marginVertical: 6,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  C2: {
    padding: 0,
    marginVertical: 6,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  listTitle: {
    fontSize: 18,
    marginBottom: SPACING.tiny,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  text: {
    color: COLORS.chipText,
    fontSize: 13,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: SPACING.tiny,
    marginRight: SPACING.tiny,
    borderRadius: 16,
    minWidth: 90,
    alignItems: "center",
  },
  chipTitle: {
    color: COLORS.chipText,
    fontSize: 13,
    fontWeight: "700",
  },
  chipAmount: {
    color: COLORS.chipAmount,
    fontSize: 12,
    marginTop: 4,
  },
  Banco: {
    backgroundColor: "#F10004",
  },
  Ahorros: {
    backgroundColor: "#FFB200",
  },
  Tarjeta1: {
    backgroundColor: "#FFEA00",
  },
  Tarjeta2: {
    backgroundColor: "#0099FF",
  },
  Paypal: {
    backgroundColor: "#0081F1",
  },
  TarjetaDeb: {
    backgroundColor: "#07DF90",
  },
  chartContainer: {
    marginVertical: SPACING.base,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.base,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    marginBottom: SPACING.tiny,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  subTitle: {
    fontSize: 14,
    marginBottom: SPACING.tiny,
    color: COLORS.textSecondary,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.fab,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",

    elevation: 6,
  },
  fabText: {
    color: COLORS.white,
    fontSize: 28,
    lineHeight: 30,
    fontWeight: "700",
  },
});

export default styles;
