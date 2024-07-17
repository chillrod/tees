import { firestore } from "@/firebase/server";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const criacoes = await firestore
      .collection("criacoes")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        return data;
      });

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
