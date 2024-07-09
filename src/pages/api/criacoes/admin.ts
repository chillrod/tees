import { firestore } from "@/firebase/server";
import type { APIRoute } from "astro";

import { CACHE_KEYS, CacheService } from "@/services/cache";

const cacheKey = CACHE_KEYS.CRIACOES;
const cacheValue = CacheService.get(cacheKey);

export const GET: APIRoute = async ({ request, params }) => {
  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  try {
    if (cacheValue && CacheService.getRemainingTTL(cacheKey) > 0) {
      return new Response(JSON.stringify(cacheValue), { status: 200 });
    }

    const criacoes = await firestore
      .collection("criacoes")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        return data;
      });

    CacheService.set(cacheKey, criacoes);

    return new Response(JSON.stringify(criacoes), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Erro ao listar criações", { status: 500 });
  }
};
