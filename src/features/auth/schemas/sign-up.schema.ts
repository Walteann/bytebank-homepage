import { z } from 'zod';

export const signUpSchema = z.object({
  username: z.string().min(3, 'O nome precisa ter no mínimo 3 caracteres'),
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
