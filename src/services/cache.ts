import { LRUCache } from "lru-cache";

export const CacheService = new LRUCache({
  //  5 minutes
  ttl: 1000 * 60 * 5,
  ttlAutopurge: true,
  allowStale: false,
});

export const SmallCacheService = new LRUCache({
  // 1 minute
  ttl: 1000 * 60,
  ttlAutopurge: true,
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
