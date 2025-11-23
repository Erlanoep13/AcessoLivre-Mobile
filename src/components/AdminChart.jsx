import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

// Dados Iguais aos da sua imagem
const MOCK_DATA = [
  { name: 'Deficiência Motora', value: 33, color: '#d12929ff' }, // Azul
  { name: 'Deficiência Visual', value: 33, color: '#10B981' },   // Verde
  { name: 'Deficiência Motora e Visual              ', value: 33, color: '#F59E0B' }, // Laranja/Amarelo
  { name: 'Sugestão de Melhoria', value: 0, color: '#EF4444' }, // Vermelho
];

export function AdminChart() {
  const size = 200; // Tamanho do gráfico
  const radius = size / 2; // Raio
  const center = size / 2; // Centro
  const totalValue = MOCK_DATA.reduce((sum, item) => sum + item.value, 0);

  let startAngle = 0;

  // Função para converter ângulo em coordenadas (x,y)
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    // Subtraímos 90 para começar do topo (meio-dia)
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <View style={styles.card}>
      

      {/* Container do Gráfico (Centralizado) */}
      <View style={styles.chartWrapper}>
        <Svg width={size} height={size}>
          <G rotation={0} origin={`${center}, ${center}`}>
            {MOCK_DATA.map((item, index) => {
              const sliceAngle = (item.value / totalValue) * 360;
              const endAngle = startAngle + sliceAngle;

              // Calcula o ponto final do arco na borda
              const end = polarToCartesian(center, center, radius, endAngle);
              
              const largeArcFlag = sliceAngle <= 180 ? '0' : '1';

              // Caminho da fatia de pizza:
              // 1. Move para o centro (L center, center)
              // 2. Desenha linha até o início do arco (L start.x, start.y) - Opcional se começar do zero
              // 3. Desenha o arco (A ...)
              // 4. Fecha o caminho voltando ao centro (Z)
              
              // Ponto inicial do arco
              const start = polarToCartesian(center, center, radius, startAngle);

              const pathData = [
                'M', center, center, // Começa no centro
                'L', start.x, start.y, // Linha até a borda inicial
                'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y, // Arco
                'Z', // Fecha voltando ao centro
              ].join(' ');

              startAngle += sliceAngle; // Prepara para a próxima fatia

              return (
                <Path
                  key={index}
                  d={pathData}
                  fill={item.color} // Preenchimento sólido
                  stroke="#FFF" // Borda branca fina para separar as fatias
                  strokeWidth={2}
                />
              );
            })}
          </G>
        </Svg>
      </View>

      {/* Legenda (Agora embaixo do gráfico) */}
      <View style={styles.legendContainer}>
        {MOCK_DATA.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={styles.legendLeft}>
              <View style={[styles.colorDot, { backgroundColor: item.color }]} />
              <Text style={styles.legendLabel}>{item.name}</Text>
            </View>
            <Text style={styles.legendValue}>{item.value}%</Text>
          </View>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartWrapper: {
    alignItems: 'center', // Centraliza o SVG horizontalmente
    marginBottom: 24, // Espaço entre gráfico e legenda
  },
  legendContainer: {
    // Removemos o flex: 1 e marginLeft que tinham antes
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Separa label (esq) e valor (dir)
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1, // Linha separadora sutil
    borderBottomColor: '#F3F4F6',
  },
  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7, // Círculo perfeito
    marginRight: 10,
  },
  legendLabel: {
    fontSize: 16,
    color: '#4B5563',
  },
  legendValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
});