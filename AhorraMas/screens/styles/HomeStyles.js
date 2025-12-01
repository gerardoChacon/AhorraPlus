import { StyleSheet } from "react-native";
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from "./theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  
  headerSubtitle: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.9)",
  },
  
  // Cards
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.light,
  },
  
  cardTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  
  cardSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  
  // Sections
  section: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.base,
  },
  
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  
  // Buttons
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.base,
    borderRadius: RADIUS.base,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.light,
  },
  
  buttonText: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.white,
  },
  
  buttonSecondary: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  
  buttonSecondaryText: {
    color: COLORS.primary,
  },
  
  // Input
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.base,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.base,
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  
  inputFocused: {
    borderColor: COLORS.primary,
  },
  
  // Labels
  label: {
    ...TYPOGRAPHY.captionBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  
  // Text
  textPrimary: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  
  textSecondary: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  
  textSmall: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  
  // Status colors
  successText: {
    color: COLORS.success,
  },
  
  errorText: {
    color: COLORS.error,
  },
  
  warningText: {
    color: COLORS.warning,
  },
  
  infoText: {
    color: COLORS.info,
  },
  
  // List items
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  
  listItemLast: {
    borderBottomWidth: 0,
  },
  
  // Chips
  chip: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    alignSelf: "flex-start",
  },
  
  chipText: {
    ...TYPOGRAPHY.small,
    color: COLORS.white,
  },
});

export default styles;