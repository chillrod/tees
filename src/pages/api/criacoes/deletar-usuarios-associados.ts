import { firestore } from "@/firebase/server";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ params, redirect, request }) => {
  const criacoes = firestore.collection("criacoes");

  const formData = await request.json();

  try {
    await criacoes
      .where("id", "==", formData.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const usuariosAssociados = doc.data().usuariosAssociados;

          const updatedUsuariosAssociados = usuariosAssociados.filter(
            (usuarioId: string) => usuarioId !== formData.userId
          );

          await criacoes.doc(doc.id).update({
            usuariosAssociados: updatedUsuariosAssociados,
          });
        });
      });

    return new Response(
      JSON.stringify({
        message: "Usuário associado com sucesso",
      })
    );
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
    });
  }
};
