import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Pressable, Text, StyleSheet, Platform } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import IngresosScreen from "../screens/04-ingresos";

const Tab = createBottomTabNavigator();

const Header = () => (
  <View style={customStyles.header}>
    <View style={customStyles.headerContent}>
      <View style={customStyles.headerLeft}>
        <Text style={customStyles.headerSection}>Cuentas</Text>
      </View>
      <Text style={customStyles.headerSection}>Cartera</Text>
      <View style={customStyles.headerRight}>
        <Text style={customStyles.grade}>A+</Text>
      </View>
    </View>
  </View>
);

function CustomTabBar({ state, descriptors, navigation }) {
  const { routes } = state;
  const focusedIndex = state.index;

  const iconForRoute = (routeName, focused) => {
    if (routeName === "Inicio") return focused ? "home" : "home-outline";
    if (routeName === "Movimientos") return focused ? "list" : "list-outline";
    if (routeName === "Presupuestos")
      return focused ? "wallet" : "wallet-outline";
    if (routeName === "Configuración")
      return focused ? "settings" : "settings-outline";
    return focused ? "ellipse" : "ellipse-outline";
  };

  return (
    <View style={customStyles.wrapper} pointerEvents="box-none">
      <View style={customStyles.container}>
        {routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = focusedIndex === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={({ pressed }) => [
                customStyles.tabButton,
                isFocused && customStyles.tabButtonActive,
                pressed && customStyles.tabButtonPressed,
              ]}
              key={route.key}
            >
              {route.name === "Presupuestos" ? (
                <MaterialCommunityIcons
                  name={isFocused ? "wallet" : "wallet-outline"}
                  size={22}
                  color={isFocused ? "#1C5E20" : "#64748b"}
                />
              ) : (
                <Ionicons
                  name={iconForRoute(route.name, isFocused)}
                  size={22}
                  color={isFocused ? "#1C5E20" : "#64748b"}
                />
              )}
              <Text
                style={[
                  customStyles.tabLabel,
                  isFocused && customStyles.tabLabelActive,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <Header />,
        headerShown: true,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Movimientos" component={IngresosScreen} />
      <Tab.Screen name="Presupuestos" component={HomeScreen} />
      <Tab.Screen name="Configuración" component={HomeScreen} />
    </Tab.Navigator>
  );
}

const customStyles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    backgroundColor: "#1C5E20",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  headerSection: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
  },
  headerLeft: {
    flex: 1,
    alignItems: "flex-start",
  },
  headerRight: {
    marginLeft: 16,
    alignItems: "flex-end",
  },
  grade: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
  },
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: Platform.OS === "ios" ? 24 : 16,
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabButton: {
    minWidth: 80,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonActive: {
    backgroundColor: "#e8f5e9",
  },
  tabLabel: {
    fontSize: 11,
    color: "#64748b",
    marginTop: 4,
  },
  tabLabelActive: {
    color: "#1C5E20",
    fontWeight: "700",
  },
  tabButtonPressed: {
    opacity: 0.7,
  },
});
