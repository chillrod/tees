import { firestore } from "@/firebase/server";
import { CACHE_KEYS, HomeCacheService } from "@/services/cache";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, cookies }) => {
  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  try {
    const cacheKey = CACHE_KEYS.CORES_CRIACAO;
    const cacheValue = HomeCacheService.get(cacheKey);

    if (cacheValue && HomeCacheService.getRemainingTTL(cacheKey) > 0) {
      return new Response(JSON.stringify(cacheValue), { status: 200 });
    }

    const cores = (await firestore.collection("cores").get()).docs.map((doc) =>
      doc.data()
    );

    HomeCacheService.set(cacheKey, cores);

    return new Response(JSON.stringify(cores), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Erro ao baixar cores", { status: 401 });
  }
};
