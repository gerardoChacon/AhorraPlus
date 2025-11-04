import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(28, 94, 32, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const ChartSelector = ({ onSelect, activeType }) => (
  <View style={styles.chartTypeSelector}>
    <Pressable
      style={({ pressed }) => [
        styles.typeButton,
        activeType === "line" && styles.activeType,
        pressed && styles.buttonPressed,
      ]}
      onPress={() => onSelect("line")}
    >
      <MaterialCommunityIcons
        name="chart-line"
        size={24}
        color={activeType === "line" ? "#1C5E20" : "#64748b"}
      />
    </Pressable>
    <Pressable
      style={({ pressed }) => [
        styles.typeButton,
        activeType === "bar" && styles.activeType,
        pressed && styles.buttonPressed,
      ]}
      onPress={() => onSelect("bar")}
    >
      <MaterialCommunityIcons
        name="chart-bar"
        size={24}
        color={activeType === "bar" ? "#1C5E20" : "#64748b"}
      />
    </Pressable>
    <Pressable
      style={({ pressed }) => [
        styles.typeButton,
        activeType === "pie" && styles.activeType,
        pressed && styles.buttonPressed,
      ]}
      onPress={() => onSelect("pie")}
    >
      <MaterialCommunityIcons
        name="chart-pie"
        size={24}
        color={activeType === "pie" ? "#1C5E20" : "#64748b"}
      />
    </Pressable>
  </View>
);

const AccountsChart = ({ data }) => {
  const [chartType, setChartType] = useState("line");
  const screenWidth = Dimensions.get("window").width - 32;

  const renderChart = () => {
    const commonProps = {
      width: screenWidth,
      height: 220,
      chartConfig,
      style: {
        marginVertical: 8,
        borderRadius: 16,
      },
    };

    switch (chartType) {
      case "line":
        return <LineChart data={data} {...commonProps} bezier />;
      case "bar":
        return <BarChart data={data} {...commonProps} />;
      case "pie":
        return (
          <PieChart
            data={data.datasets[0].data.map((value, index) => ({
              name: data.labels[index],
              value,
              color: data.colors
                ? data.colors[index]
                : `#${Math.floor(Math.random() * 16777215).toString(16)}`,
              legendFontColor: "#1f2937",
              legendFontSize: 12,
            }))}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estructura de gastos</Text>
        <ChartSelector activeType={chartType} onSelect={setChartType} />
      </View>
      <View style={styles.chartContainer}>{renderChart()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    padding: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C5E20",
  },
  chartTypeSelector: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 4,
  },
  typeButton: {
    padding: 8,
    borderRadius: 8,
  },
  activeType: {
    backgroundColor: "#ffffff",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  chartContainer: {
    alignItems: "center",
  },
});

export default AccountsChart;
