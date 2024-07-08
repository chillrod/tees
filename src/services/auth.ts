import type { AstroCookies } from "astro";
import { app } from "../firebase/server";

import { getAuth } from "firebase-admin/auth";

export const AuthVerifier = async (
  sessionCookie: string,
  AstroCookies: AstroCookies
): Promise<string> => {
  const auth = getAuth(app);
  const decodedCookie = await auth.verifySessionCookie(sessionCookie);

  if (!decodedCookie) {
    AstroCookies.delete("__session");
  }

  return decodedCookie.uid;
};
