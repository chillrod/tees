import type { APIRoute } from "astro";
import { firestore } from "../../../firebase/server";

export const POST: APIRoute = async ({ params, redirect, request }) => {
  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  const configuracao = firestore.collection("cores");

  const formData = await request.json();

  try {
    configuracao
      .where("id", "==", formData.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
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
