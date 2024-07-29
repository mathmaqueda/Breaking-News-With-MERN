import z from 'zod';

export const signinSchema = z.object({
    email: z.string().email({message: "E-mail inválido"}).toLowerCase(),
    password: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
});