import type { APIRoute } from "astro";
import { firestore } from "../../../firebase/server";
import { CACHE_KEYS, SmallCacheService } from "@/services/cache";

export const POST: APIRoute = async ({ request }) => {
  const configuracao = firestore.collection("cores");

  const formData = await request.json();

  try {
    await configuracao.add({
      ...formData,
    });

    return new Response(
      JSON.stringify({
        message: "Configuração atualizada com sucesso!",
        criacao: formData.id,
      })
    );
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
    });
  }
};

export const GET: APIRoute = async () => {
  /* Get token from request headers */

  try {
    const cacheKey = CACHE_KEYS.CORES;
    const cacheValue = SmallCacheService.get(cacheKey);

    if (cacheValue && SmallCacheService.getRemainingTTL(cacheKey) > 0) {
      return new Response(JSON.stringify(cacheValue), { status: 200 });
    }

    const cores = (await firestore.collection("cores").get()).docs.map((doc) =>
      doc.data()
    );

    SmallCacheService.set(cacheKey, cores);

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
