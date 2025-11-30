import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "./theme"; // Asegúrate de que la ruta es correcta

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.base,
    marginTop: 10,
    marginBottom: SPACING.base,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  chartSection: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.base,
    marginBottom: SPACING.base,
  },
  accountsSection: {
    flex: 1,
    marginHorizontal: SPACING.base,
    marginBottom: SPACING.base,
  },
});

export default styles;