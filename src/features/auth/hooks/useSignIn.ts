import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/auth.store';
import { useModalStore } from '@/shared/hooks/useModalStore';
import { logger } from '@/shared/lib/utils/logger';
import { signInAction } from '@/app/services/action';
import type { SignInFormData } from '../schemas/sign-in.schema';

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;

interface SignInResult {
  success: boolean;
  token?: string;
  message: string;
}

export function useSignIn() {
  const setUser = useAuthStore((state) => state.setUser);
  const closeModal = useModalStore((state) => state.closeModal);

  return useMutation({
    mutationFn: async (data: SignInFormData): Promise<SignInResult> => {
      return signInAction(data);
    },
    onSuccess: (result) => {
      if (result.success && result.token) {
        setUser({ email: '' });
        closeModal();
        logger.info('Login successful, redirecting...');

        const encodedToken = btoa(result.token);
        const appUrl = NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        window.location.href = `${appUrl}/?auth=${encodedToken}`;
      }
    },
    onError: (error) => {
      logger.error('Login failed', error);
    },
  });
}
