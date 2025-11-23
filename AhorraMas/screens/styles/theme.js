export const COLORS = {
  background: "#f2f4f8",
  white: "#ffffff",
  textPrimary: "#111827",
  textSecondary: "#6b7280",
  success: "#99ff00ff",
  accent: "#0ea5a4",
  chipText: "#ffffff",
  fab: "#0ea5a4",
  muted: "#9CA3AF",
  chipAmount: "rgba(255,255,255,0.95)",
};

export const SPACING = {
  base: 16,
  small: 12,
  tiny: 8,
  nano: 4,
};

export const TAB = {
  active: COLORS.accent,
  inactive: COLORS.textSecondary,
  iconWrapperSize: 44,
  iconSizeDefault: 22,
  iconActiveColor: COLORS.white,
  iconInactiveColor: COLORS.textSecondary,
  style: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    height: 68,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingTop: 8,
    backgroundColor: COLORS.white,
    borderTopWidth: 0,
    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    // android elevation
    elevation: 8,
  },
  labelStyle: { fontSize: 12, fontWeight: "600", marginBottom: 6 },
};

export default { COLORS, SPACING, TAB };