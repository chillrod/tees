import type { APIRoute } from "astro";
import { app, auth } from "../../../firebase/server";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  // Verifiy session cookie
  const sessionCookie = cookies.get("__session")?.value;

  if (!sessionCookie) {
    return new Response("No session cookie found", { status: 401 });
  }

  try {
    await auth.verifySessionCookie(sessionCookie, true);
  } catch (error) {
    return new Response("Invalid session cookie", { status: 401 });
    return redirect("/logar");
  }

  return redirect("/apresentacao");
};
