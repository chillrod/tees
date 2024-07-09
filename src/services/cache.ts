import { LRUCache } from "lru-cache";

export const CacheService = new LRUCache({
  max: 5000,
  //  10 minutes
  ttl: 1000 * 60 * 10,
  allowStale: false,
});

export const SmallCacheService = new LRUCache({
  max: 1000,
  // 1 minute
  ttl: 1000 * 60,
  allowStale: false,
});

export enum CACHE_KEYS {
  CORES = "cores",
  PEDIDOS = "pedidos",
  CRIACOES = "criacoes",
  CRIACAO = "criacao",
  CRIACAO_USUARIO = "criacao_usuario",
  USUARIOS = "usuarios",
}
