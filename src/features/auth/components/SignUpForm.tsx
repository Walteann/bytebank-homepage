'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Button from '@/shared/components/ui/Button/Button';
import InputText from '@/shared/components/ui/InputText/InputText';
import { useSignUp } from '../hooks/useSignUp';
import { signUpSchema, SignUpFormData } from '../schemas/sign-up.schema';

const SignUpForm = () => {
  const { mutate: signUp, isPending, error, isSuccess } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    signUp(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full max-w-[445px] mx-auto"
    >
      <div className="w-full relative h-[180px] md:h-[220px] flex items-center justify-center mb-2">
        <Image
          width={355}
          height={262}
          className="object-contain"
          src="https://bytebank-assets.vercel.app/images/Ilustração_SignUp.svg"
          alt="ilustracao cadastro"
        />
      </div>

      <h2 className="text-lg md:text-xl font-bold mb-2 text-center">
        Preencha os campos abaixo para criar sua conta corrente!
      </h2>

      {error && (
        <div className="w-full p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error.message || 'Erro ao criar conta. Tente novamente.'}
        </div>
      )}

      {isSuccess && (
        <div className="w-full p-2 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
          Conta criada com sucesso! Faça login para continuar.
        </div>
      )}

      <div className="w-full flex gap-4 flex-col">
        <InputText
          {...register('username')}
          label="Nome"
          type="text"
          placeholder="Digite seu nome completo"
          error={errors.username?.message}
          disabled={isPending}
        />

        <InputText
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
          {...register('email')}
          error={errors.email?.message}
          disabled={isPending}
        />

        <InputText
          label="Senha"
          type="password"
          {...register('password')}
          placeholder="Digite sua senha"
          error={errors.password?.message}
          disabled={isPending}
        />
      </div>

      <div className="w-full flex justify-center mt-2">
        <Button
          type="submit"
          value={isPending ? 'Criando conta...' : 'Criar conta'}
          className="w-full !bg-accent hover:!bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending}
        />
      </div>

      {isPending && (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
          <span>Criando sua conta...</span>
        </div>
      )}
    </form>
  );
};

export default SignUpForm;
