
import { z } from "zod";

/**
 * Esquema Zod para validação do formulário de Login.
 */
export const signInSchema = z.object({
    email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
    password: z.string().nonempty("Senha é obrigatória"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
