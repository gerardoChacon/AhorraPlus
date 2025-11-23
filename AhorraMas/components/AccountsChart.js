import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const chartConfig = {
  backgroundColor: "#ffffff", // Asegúrate de que sea blanco
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(28, 94, 32, ${opacity})`,
  // ...
};

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
        return <LineChart data={data} {...commonProps} />;
      case "bar":
        return <BarChart data={data} {...commonProps} />;
      case "pie":
        return (
          <PieChart
            data={data.datasets[0].data.map((value, index) => ({
              name: data.labels[index],
              value,
              color: data.colors[index] || "#ff0000",
              legendFontColor: "#1f2937",
              legendFontSize: 12,
            }))}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent"
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
        <View style={styles.chartTypeSelector}>
          <MaterialCommunityIcons
            name="chart-line"
            size={24}
            onPress={() => setChartType("line")}
          />
          <MaterialCommunityIcons
            name="chart-bar"
            size={24}
            onPress={() => setChartType("bar")}
          />
          <MaterialCommunityIcons
            name="chart-pie"
            size={24}
            onPress={() => setChartType("pie")}
          />
        </View>
      </View>
      <View style={styles.chartContainer}>{renderChart()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "transparent", padding: 0 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
  },
  title: { fontSize: 16, fontWeight: "600", color: "#1C5E20" },
  chartContainer: { alignItems: "center" },
  chartTypeSelector: {
    flexDirection: "row",
  },
});

export default AccountsChart;