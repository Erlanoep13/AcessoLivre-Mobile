// Mapeamento de Tipo -> Cor
export const ACCESSIBILITY_COLORS = {
  'Motora': '#d32f2f',          // Vermelho
  'Visual': '#2e7d32',          // Verde
  'Motora e Visual': '#1976d2', // Azul
  'default': '#757575'          // Cinza (Sugestão/Outros)
};

// Função auxiliar para pegar a cor com segurança
export function getPinColor(tipo) {
  return ACCESSIBILITY_COLORS[tipo] || ACCESSIBILITY_COLORS['default'];
}