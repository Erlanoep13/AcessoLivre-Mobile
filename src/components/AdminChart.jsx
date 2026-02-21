import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

const MOCK_DATA = [
  { name: 'Deficiência Motora', value: 35, color: '#dc2626' },
  { name: 'Deficiência Visual', value: 20, color: '#4ade80' },
  { name: 'Motora e Visual', value: 20, color: '#2563eb' },
  { name: 'Sugestão de Melhoria', value: 25, color: '#d1cfce' },
];

export function AdminChart() {
  const { theme } = useTheme(); //
  const size = 180;
  const radius = size / 2;
  const center = size / 2;
  const totalValue = MOCK_DATA.reduce((sum, item) => sum + item.value, 0);

  let startAngle = 0;

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surfaceContainerLow }]}>
      <Text style={[styles.cardTitle, { color: theme.colors.onSurface }]}>Locais por Categoria</Text>

      <View style={styles.chartWrapper}>
        <Svg width={size} height={size}>
          <G origin={`${center}, ${center}`}>
            {MOCK_DATA.map((item, index) => {
              const sliceAngle = (item.value / totalValue) * 360;
              const endAngle = startAngle + sliceAngle;
              const start = polarToCartesian(center, center, radius, startAngle);
              const end = polarToCartesian(center, center, radius, endAngle);
              const largeArcFlag = sliceAngle <= 180 ? '0' : '1';

              const pathData = [
                'M', center, center,
                'L', start.x, start.y,
                'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y,
                'Z',
              ].join(' ');

              startAngle += sliceAngle;

              return (
                <Path
                  key={index}
                  d={pathData}
                  fill={item.color}
                  stroke={theme.colors.surfaceContainerLow}
                  strokeWidth={2}
                />
              );
            })}
          </G>
        </Svg>
      </View>

      <View style={styles.legendContainer}>
        {MOCK_DATA.map((item, index) => (
          <View key={index} style={[styles.legendItem, { borderBottomColor: theme.colors.outlineVariant + '20' }]}>
            <View style={styles.legendLeft}>
              <View style={[styles.colorDot, { backgroundColor: item.color }]} />
              <Text style={[styles.legendLabel, { color: theme.colors.onSurfaceVariant }]}>{item.name}</Text>
            </View>
            <Text style={[styles.legendValue, { color: theme.colors.onSurface }]}>{item.value}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  chartWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  legendContainer: {
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  legendLabel: {
    fontSize: 14,
  },
  legendValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});