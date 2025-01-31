import type { APIRoute } from "astro";
import { firestore } from "../../../firebase/server";

export const POST: APIRoute = async ({ request }) => {
  const configuracao = firestore.collection("cores");

  const formData = await request.json();

  try {
    configuracao
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
