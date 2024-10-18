import { z } from "zod";

const userSchema = z
  .object({
    User_dni: z.number({
      required_error: "La cédula es obligatoria",
      invalid_type_error: "Ingrese una cédula válida",
    }),

    User_role: z
      .enum(["ADMIN", "MANAGER", "USER", ""])
      .refine((val) => val !== "", {
        message: "Por favor, seleccione un rol válido",
      }),

    User_name: z
      .string({
        required_error: "El nombre es obligatorio",
        invalid_type_error: "El nombre debe ser un texto",
      })
      .min(2, "El nombre debe tener al menos 2 caracteres"),

    User_surname: z
      .string({
        required_error: "El apellido es obligatorio",
        invalid_type_error: "El apellido debe ser un texto",
      })
      .min(2, "El apellido debe tener al menos 2 caracteres"),

    User_email: z
      .string({
        required_error: "El correo es obligatorio",
        invalid_type_error: "El correo debe ser un texto",
      })
      .email("Ingrese un correo válido"),

    User_password: z
      .string({
        required_error: "La contraseña es obligatoria",
        invalid_type_error: "La contraseña debe ser un texto",
      })
      .min(6, "La contraseña debe tener al menos 6 caracteres"),

    User_passwordConfirm: z.string({
      required_error: "La confirmación de la contraseña es obligatoria",
      invalid_type_error: "La confirmación de la contraseña debe ser un texto",
    }),

    User_phoneNumber: z
      .string({
        required_error: "El número de teléfono es obligatorio",
        invalid_type_error: "El número de teléfono debe ser un texto",
      })
      .regex(/^\+?[0-9]{7,15}$/, "Ingrese un número de teléfono válido"),

    User_address: z
      .string({
        required_error: "La dirección es obligatoria",
        invalid_type_error: "La dirección debe ser un texto",
      })
      .min(5, "La dirección debe tener al menos 5 caracteres"),
  })
  .refine((data) => data.User_password === data.User_passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["User_passwordConfirm"],
  });

export default userSchema;
