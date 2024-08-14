import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(1, { message: "O nome não pode ser vazio" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O nome não pode ter apenas espaços",
    }),
  username: z
    .string()
    .min(1, { message: "O nome de usuário não pode ser vazio" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O nome de usuário não pode ter apenas espaços",
    }),
  email: z.string().email({message: "E-mail inválido"}).toLowerCase(),
  avatar: z
    .string()
    .min(1, { message: "O link do avatar não pode ser vazio" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O link do avatar não pode ter apenas espaços",
    }),
  background: z
    .string()
    .min(1, { message: "O link do plano de fundo não pode ser vazio" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O link do plano de fundo não pode ter apenas espaços",
    }),
})

export const passwordSchema = z.object({
  currentPassword: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
  newPassword: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
  confirmNewPassword: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"],
});