import type { APIRoute } from "astro";
import { auth } from "../../../firebase/server";

import { CACHE_KEYS, CacheService } from "@/services/cache";

export const GET: APIRoute = async () => {
  try {
    const cacheKey = CACHE_KEYS.USUARIOS;
    const cacheValue = CacheService.get(cacheKey);

    if (cacheValue && CacheService.getRemainingTTL(cacheKey) > 0) {
      return new Response(JSON.stringify(cacheValue), { status: 200 });
    }

    const usuarios = await auth.listUsers();

    CacheService.set(cacheKey, usuarios);

    return new Response(JSON.stringify(usuarios), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Erro ao baixar usuários", { status: 401 });
  }
};
