import type { APIRoute } from "astro";
import { firestore } from "../../../firebase/server";

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
