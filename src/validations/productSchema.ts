import { z } from "zod";

const productSchema = z.object({
  Product_ref: z
    .string({
      required_error: "La referencia es obligatoria",
      invalid_type_error: "Digite una referencia válida",
    })
    .min(1, "Digite una referencia válida"),
  Product_name: z
    .string({
      required_error: "El nombre del producto es obligatorio",
      invalid_type_error: "Digite un nombre válido",
    })
    .min(1, "Digite un nombre válido"),
  Product_description: z
    .string({
      required_error: "La descrición es obligatoria",
      invalid_type_error: "Escriba un texto válido",
    })
    .min(1, "Descripción demasiado corta")
    .max(100, "Descripción demasiado larga"),
  Product_cost: z
    .number({
      required_error: "El costo es obligatorio",
      invalid_type_error: "Digite una cifra válida",
    })
    .positive("Digite una cantidad válida"),
  Product_qty: z
    .number({
      required_error: "La cantidad es obligatoria",
      invalid_type_error: "Digite una cantidad válida",
    })
    .positive("Digite una cantidad válida")
    .int({
      message: "La cantidad debe ser un número entero",
    }),
});

export default productSchema;
