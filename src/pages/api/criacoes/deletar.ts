import { firestore } from "@/firebase/server";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const criacaoQueryParams = request.url.split("?")[1].replace("id=", "");

  const criacoes = firestore.collection("criacoes");

  try {
    await criacoes
      .where("id", "==", criacaoQueryParams)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
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
