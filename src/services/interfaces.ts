export interface PedidoForm {
  nome?: string;
  email?: string;
  whatsapp?: string;
  canvas?: string;
  tamanhos: {
    pp: number;
    p: number;
    m: number;
    g: number;
    gg: number;
    xg: number;
  };
}
