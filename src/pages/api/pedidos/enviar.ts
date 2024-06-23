import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const pedidos = db.collection("pedidos");

export const POST: APIRoute = async ({ params, redirect, request }) => {
  const formData = await request.json();

  try {
    await pedidos.add(formData);
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }

  return redirect("/");
};
