import { firestore } from "@/firebase/server";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ params, redirect, request }) => {
  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  const criacoes = firestore.collection("criacoes");

  const formData = await request.json();

  try {
    await criacoes
      .where("id", "==", formData.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            ...formData,
          });
        });
      });

    return new Response(
      JSON.stringify({
        message: "Criação deletada com sucesso",
      })
    );
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
    });
  }
};