import { firestore } from "@/firebase/server";
import type { APIRoute } from "astro";

import { CACHE_KEYS, SmallCacheService } from "@/services/cache";

export const POST: APIRoute = async ({ request, params }) => {
  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  const formData = await request.json();

  try {
    const cacheKey = CACHE_KEYS.CRIACAO_USUARIO;
    const cacheValue = SmallCacheService.get(cacheKey);
    
    if (cacheValue && SmallCacheService.getRemainingTTL(cacheKey) > 0) {
      return new Response(JSON.stringify(cacheValue), { status: 200 });
    }

    const criacoes = await firestore
      .collection("criacoes")
      .where("id", "==", formData.id)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());

        return data;
      });

    SmallCacheService.set(cacheKey, criacoes);

    return new Response(JSON.stringify(criacoes), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Erro ao carregar criação", { status: 500 });
  }
};
