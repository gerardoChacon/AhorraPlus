import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccountsChart = ({ data }) => {
  const [chartType, setChartType] = useState('bar');
  const screenWidth = Dimensions.get('window').width - 64;

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1, index) => {
      if (data.colors && data.colors[index]) {
        return data.colors[index];
      }
      const defaultColors = ['#1C5E20', '#07DF90', '#0099FF', '#FFB200', '#F10004', '#0081F1'];
      return defaultColors[index % defaultColors.length];
    },
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#e3e3e3',
      strokeWidth: 1,
    },
    propsForLabels: {
      fontSize: 11,
      fontWeight: '500',
    },
  };

  // Calcular ancho dinámico para gráficas de barras con muchas barras
  const getChartWidth = () => {
    if (chartType === 'bar' && data.labels && data.labels.length > 4) {
      // 80px por barra aprox
      return Math.max(screenWidth, data.labels.length * 80);
    }
    return screenWidth;
  };

  // Calcular altura dinámico para gráfica de pie con leyenda
  const getChartHeight = () => {
    if (chartType === 'pie') {
      // Tamaño pequeño como en el código original
      return 220;
    }
    return 220;
  };

  const renderChart = () => {
    const chartWidth = getChartWidth();
    const chartHeight = getChartHeight();

    const commonProps = {
      width: chartWidth,
      height: chartHeight,
      chartConfig,
      style: {
        marginVertical: 8,
        borderRadius: 16,
      },
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart
            data={data}
            {...commonProps}
            fromZero
            withInnerLines
            withOuterLines
          />
        );
      case 'bar':
        return (
          <BarChart
            data={data}
            {...commonProps}
            fromZero
            showValuesOnTopOfBars
            withInnerLines
          />
        );
      case 'pie':
        return (
          <PieChart
            data={data.datasets[0].data.map((value, index) => ({
              name: data.labels[index] || `Item ${index + 1}`,
              value,
              color: (data.colors && data.colors[index]) || '#1C5E20',
              legendFontColor: '#1f2937',
              legendFontSize: 12,
            }))}
            width={chartWidth}
            height={chartHeight}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="20"
            center={[chartWidth / -180, 2]}
          />
        );
      default:
        return null;
    }
  };

  const chartWidth = getChartWidth();

  return (
    <View>
      {/* Botones selectores de gráfica */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        marginBottom: 12,
        paddingHorizontal: 8
      }}>
        <TouchableOpacity
          onPress={() => setChartType('line')}
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: chartType === 'line' ? '#1C5E20' : '#f0f0f0',
          }}
        >
          <MaterialCommunityIcons 
            name="chart-line" 
            size={20} 
            color={chartType === 'line' ? 'white' : '#1C5E20'} 
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setChartType('bar')}
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: chartType === 'bar' ? '#1C5E20' : '#f0f0f0',
          }}
        >
          <MaterialCommunityIcons 
            name="chart-bar" 
            size={20} 
            color={chartType === 'bar' ? 'white' : '#1C5E20'} 
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setChartType('pie')}
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: chartType === 'pie' ? '#1C5E20' : '#f0f0f0',
          }}
        >
          <MaterialCommunityIcons 
            name="chart-pie" 
            size={20} 
            color={chartType === 'pie' ? 'white' : '#1C5E20'} 
          />
        </TouchableOpacity>
      </View>

      {/* Gráfica con scroll horizontal si es necesario */}
      {chartWidth > screenWidth ? (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          style={{ marginHorizontal: -16 }}
        >
          <View style={{ paddingHorizontal: 16, alignItems: 'center' }}>
            {renderChart()}
          </View>
        </ScrollView>
      ) : (
        <View style={{ alignItems: 'center' }}>
          {renderChart()}
        </View>
      )}
    </View>
  );
};

export default AccountsChart;