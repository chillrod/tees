import type { APIRoute } from "astro";
import { firestore, storage } from "../../../firebase/server";
import shortUUID from "short-uuid";

export const POST: APIRoute = async ({ params, redirect, request }) => {
  const pedidos = firestore.collection("pedidos");

  const formData = await request.json();

  const { nome, email, whatsapp, tamanhos } = formData;

  try {
    const uuid = shortUUID.generate();

    const bucket = storage.bucket().file(`pedidos/${email}/${uuid}`);

    const base64Data = formData.canvas.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    bucket.save(buffer, {
      gzip: true,
      contentType: "image/png",
    });

    await pedidos.add({
      nome,
      email,
      whatsapp,
      tamanhos,
      imagePath: `/${email}/${uuid}`,
    });
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
    });
  }

  return redirect("/");
};
