import type { APIRoute } from "astro";
import { firestore, storage } from "../../../firebase/server";

export const POST: APIRoute = async ({ params, redirect, request }) => {
  const formData = await request.json();

  const { email, uuid } = formData;

  try {
    const bucket = storage.bucket();

    const downloadLink = await bucket
      .file(`pedidos/${email}/${uuid}`)
      .getSignedUrl({
        action: "read",
        expires: Date.now() + 1000 * 60 * 60,
      });

    return new Response(JSON.stringify(downloadLink), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
    });
  }

  return redirect("/");
};
