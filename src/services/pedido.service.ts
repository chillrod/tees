import type { PedidoForm } from "./interfaces";

const updateFormData = (form: PedidoForm, formData: FormData) => {
  if (form.nome && form.email && form.whatsapp && form.tamanhos) {
    formData.append("nome", form.nome);
    formData.append("email", form.email);
    formData.append("whatsapp", form.whatsapp);
    formData.append("tamanhos", JSON.stringify(form.tamanhos));
  }
};

// export const PedidoService = {
//   async EnviarPedidoFireStore(form: PedidoForm) {
//     const formData = new FormData();

//     const updatedFormData = updateFormData(form, formData);
//     console.log("🚀 ~ EnviarPedidoFireStore ~ updatedFormData:", updatedFormData)

//     try {
//       const response = await fetch("/api/pedidos/enviar", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedFormData),
//       });

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   },
// };
