import type { APIRoute } from "astro";
import { firestore } from "../../../firebase/server";

import { CACHE_KEYS, CacheService } from "@/services/cache";

const cacheKey = CACHE_KEYS.PEDIDOS;
const cacheValue = CacheService.get(cacheKey);

export const GET: APIRoute = async ({ request, cookies }) => {
  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  try {
    if (cacheValue)
      return new Response(JSON.stringify(cacheValue), { status: 200 });

    const pedidos = (await firestore.collection("pedidos").get()).docs.map(
      (doc) => doc.data()
    );

    CacheService.set(cacheKey, pedidos);

    return new Response(JSON.stringify(pedidos), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Erro ao baixar usuários", { status: 401 });
  }
};
