import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/auth.store';
import { useModalStore } from '@/shared/hooks/useModalStore';
import { logger } from '@/shared/lib/utils/logger';
import type { SignInFormData } from '../schemas/sign-in.schema';

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;

interface SignInResult {
  success: boolean;
  message: string;
}

/**
 * Hook de login seguro
 * 
 * SEGURANÇA:
 * - Usa endpoint /api/auth/login que seta cookie HttpOnly
 * - NÃO passa token na URL (vulnerável a leaks)
 * - NÃO usa localStorage (vulnerável a XSS)
 * - Cookie é enviado automaticamente pelo browser
 */
export function useSignIn() {
  const setUser = useAuthStore((state) => state.setUser);
  const closeModal = useModalStore((state) => state.closeModal);

  return useMutation({
    mutationFn: async (data: SignInFormData): Promise<SignInResult> => {
      // Chama API que seta cookie HttpOnly
      const response = await fetch('/homepage/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include', // Importante: inclui cookies
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erro no login');
      }

      return result;
    },
    onSuccess: (result) => {
      if (result.success) {
        setUser({ email: '' });
        closeModal();
        logger.info('Login successful, redirecting...');

        // Redireciona SEM token na URL - cookie HttpOnly é enviado automaticamente
        const appUrl = NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        window.location.href = appUrl;
      }
    },
    onError: (error) => {
      logger.error('Login failed', error);
    },
  });
}
