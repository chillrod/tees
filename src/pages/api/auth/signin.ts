import type { APIRoute } from "astro";
import { app, auth } from "../../../firebase/server";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  /* Verify id token */
  try {
    await auth.verifyIdToken(idToken);
  } catch (error) {
    return new Response("Invalid token", { status: 401 });
  }

  /* Create and set session cookie */
  const twoYears = 60 * 60 * 24 * 365 * 2;
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: twoYears,
  });

  cookies.set("__session", sessionCookie, {
    path: "/",
  });

  return redirect("/apresentacao");
};
