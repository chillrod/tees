enum Status {
  PENDENTE = "pending",
  APROVADO = "approved",
  REPROVADO = "rejected",
}
interface Criacao {
  id: string;
  canvas: any;
  userId?: string;
  user?: string;
  usuariosAssociados?: string[];
  image?: string;
  teeColor: string;
}
