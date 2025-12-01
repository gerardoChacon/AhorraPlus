export const COLORS = {
  // Colores principales
  primary: "#1C5E20",
  primaryLight: "#2D7A2F",
  primaryDark: "#0D3D10",
  
  // Colores secundarios
  success: "#07DF90",
  error: "#F10004",
  warning: "#FFB200",
  info: "#0099FF",
  
  // Colores neutros
  background: "#F5F5F5",
  white: "#FFFFFF",
  surface: "#FFFFFF",
  
  // Texto
  textPrimary: "#1F2937",
  textSecondary: "#6B7280",
  textTertiary: "#9CA3AF",
  
  // Bordes y divisores
  border: "#E5E7EB",
  divider: "#F0F0F0",
  
  // Estados
  disabled: "#D1D5DB",
  muted: "#9CA3AF",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  base: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  xs: 4,
  sm: 8,
  base: 12,
  md: 16,
  lg: 20,
  xl: 24,
};

export const SHADOWS = {
  light: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  dark: {
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 6,
  },
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  captionBold: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  smallBold: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
};

export const TAB = {
  active: COLORS.primary,
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
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  labelStyle: { fontSize: 12, fontWeight: "600", marginBottom: 6 },
};

export default { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY, TAB };