import type { APIRoute } from "astro";
import { auth } from "../../../firebase/server";

export const POST: APIRoute = async ({ request, cookies }) => {
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  const body = await request.json();

  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  try {
    await auth.setCustomUserClaims(body.uid, { admin: true });

    return new Response("Usuário agora é administrador", {
      status: 200,
    });
  } catch (error) {
    return new Response("Erro ao tornar administrador", { status: 401 });
  }
};
