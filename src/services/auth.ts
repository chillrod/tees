import type { AstroCookies } from "astro";
import { app } from "../firebase/server";

import { getAuth } from "firebase-admin/auth";

export const AuthVerifier = async (
  sessionCookie: string,
  AstroCookies: AstroCookies
): Promise<string | undefined> => {
  const auth = getAuth(app);
  try {
    const decodedCookie = await auth.verifySessionCookie(sessionCookie);

    if (!decodedCookie) {
      AstroCookies.delete("__session");
    }
    return decodedCookie.uid;
  } catch {
    AstroCookies.delete("__session");
  }
};
