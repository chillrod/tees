import { firestore } from "@/firebase/server";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, params }) => {
  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  try {
    const userQueryParams = request.url.split("?")[1].replace("user=", "");

    const criacoes = await firestore
      .collection("criacoes")
      .where("userId", "==", userQueryParams)
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
