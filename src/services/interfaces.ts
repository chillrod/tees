export interface PedidoForm {
  nome?: string;
  email?: string;
  whatsapp?: string;
  tamanhos: {
    pp: number;
    p: number;
    m: number;
    g: number;
    gg: number;
    xg: number;
  };
}
