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
      return context.redirect("/");
    }

    if (!sessionCookie && isRoot) {
      return context.redirect("/logar");
    }

    if (sessionCookie) {
      const auth = getAuth(app);

      const decodedCookie = await auth
        .verifySessionCookie(sessionCookie.value)
        .then((decodedToken) => decodedToken)
        .catch(() => {
          throw new Error("Invalid session cookie");
        });

      const user = await auth.getUser(decodedCookie.uid);

      context.locals.user = user;

      if (isAdmin && !user?.customClaims?.admin) {
        return context.redirect("/");
      }
    }

    return next();
  } catch (error) {
    context.locals.user = null;

    context.cookies.delete("__session");

    return context.redirect("/logar");
  }
});
