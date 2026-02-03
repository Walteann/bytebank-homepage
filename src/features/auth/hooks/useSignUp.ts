import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/api/client';
import { useModalStore } from '@/shared/hooks/useModalStore';
import { logger } from '@/shared/lib/utils/logger';
import { message } from '@/shared/components/ui/Toast/toast';
import type { SignUpFormData } from '../schemas/sign-up.schema';

interface SignUpResponse {
  message: string;
  result?: {
    token: string;
  };
}

export function useSignUp() {
  const closeModal = useModalStore((state) => state.closeModal);

  return useMutation({
    mutationFn: async (data: SignUpFormData): Promise<SignUpResponse> => {
      return apiClient.post<SignUpResponse>('/user', data);
    },
    onSuccess: (result) => {
      if (result.result?.token) {
        message.success('Conta criada com sucesso!');
        closeModal();
        logger.info('Account created successfully');
      }
    },
    onError: (error) => {
      logger.error('Sign up failed', error);
      message.error('Erro ao criar conta. Tente novamente.');
    },
  });
}
