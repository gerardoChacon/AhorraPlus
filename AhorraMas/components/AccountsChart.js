import React from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const AccountsChart = ({ data }) => {
  const screenWidth = Dimensions.get('window').width - 64; // Ajusta según el padding

  return (
    <View>
      <BarChart
        data={data}
        width={screenWidth}
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1, index) => {
            // Si hay colores personalizados en data.colors, úsalos
            if (data.colors && data.colors[index]) {
              return data.colors[index];
            }
            // Colores por defecto si no hay colores personalizados
            const defaultColors = ['#1C5E20', '#07DF90', '#0099FF', '#FFB200', '#F10004', '#0081F1'];
            return defaultColors[index % defaultColors.length];
          },
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForBackgroundLines: {
            strokeDasharray: '', // Líneas sólidas
            stroke: '#e3e3e3',
            strokeWidth: 1,
          },
          propsForLabels: {
            fontSize: 11,
            fontWeight: '500',
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        fromZero
        showValuesOnTopOfBars
        withInnerLines
      />
    </View>
  );
};

export default AccountsChart;