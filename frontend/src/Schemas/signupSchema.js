import z from 'zod';

export const signupSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
        .transform((name) => 
            name
            .trim()
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" ")
        ),
    email: z.string().email({ message: "Email inválido" }).toLowerCase(),
    password: z.string().min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
    confirmPassword: z.string().min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
});