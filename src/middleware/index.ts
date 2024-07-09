import { defineMiddleware } from "astro/middleware";

import { app } from "../firebase/server";

import { getAuth } from "firebase-admin/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const isLogar = context.url.pathname.includes("/logar");

  const isRoot =
    context.url.pathname === "/" || context.url.pathname.includes("criacao=");

  const isAdmin = context.url.pathname.includes("/admin");

  try {
    const sessionCookie = context.cookies.get("__session");

    if (isLogar && !sessionCookie) return next();

    if (isLogar && sessionCookie) {
      return Response.redirect(new URL("/", context.url), 302);
    }

    if (!sessionCookie && isRoot) {
      return Response.redirect(new URL("/logar", context.url), 302);
    }

    if (sessionCookie) {
      const auth = getAuth(app);
      const decodedCookie = await auth.verifySessionCookie(sessionCookie.value);

      const user = await auth.getUser(decodedCookie.uid);

      context.locals.user = user;

      if (isAdmin && !user?.customClaims?.admin) {
        return Response.redirect(new URL("/", context.url), 302);
      }
    }

    return next();
  } catch {
    context.locals.user = null;

    context.cookies.delete("__session");

    return Response.redirect(new URL("/logar", context.url), 302);
  }
});
