import type { APIRoute } from "astro";
import { auth } from "../../../firebase/server";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  try {
    await auth.setCustomUserClaims(body.uid, { admin: true });

    return new Response("Usuário agora é administrador", {
      status: 200,
    });
  } catch (error) {
    return new Response("Erro ao tornar administrador", { status: 401 });
  }
};
