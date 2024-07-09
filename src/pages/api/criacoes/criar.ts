import type { APIRoute } from "astro";
import { firestore } from "../../../firebase/server";

import { CACHE_KEYS, SmallCacheService } from "@/services/cache";

export const POST: APIRoute = async ({ params, redirect, request }) => {
  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  const criacoes = firestore.collection("criacoes");

  const formData = await request.json();

  try {
    await criacoes.add({
      ...formData,
    });

    return new Response(
      JSON.stringify({
        message: "Criação salva com sucesso",
        criacao: formData.id,
      })
    );
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
    });
  }
};

export const GET: APIRoute = async ({ request, params }) => {
  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  try {
    const cacheKey = CACHE_KEYS.CRIACAO_USUARIO;
    const cacheValue = SmallCacheService.get(cacheKey);
    
    if (cacheValue && SmallCacheService.getRemainingTTL(cacheKey) > 0) {
      return new Response(JSON.stringify(cacheValue), { status: 200 });
    }

    const userQueryParams = request.url.split("?")[1].replace("user=", "");

    const criacoes = await firestore
      .collection("criacoes")
      .where("userId", "==", userQueryParams)
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
    return new Response("Erro ao listar criações", { status: 500 });
  }
};
