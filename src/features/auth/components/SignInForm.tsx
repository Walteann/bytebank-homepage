'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Button from '@/shared/components/ui/Button/Button';
import InputText from '@/shared/components/ui/InputText/InputText';
import { useSignIn } from '../hooks/useSignIn';
import { signInSchema, SignInFormData } from '../schemas/sign-in.schema';

const SignInForm = () => {
  const { mutate: signIn, isPending, error } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    signIn(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full max-w-[445px] mx-auto"
    >
      <div className="w-full relative h-[180px] md:h-[200px] flex items-center justify-center mb-2">
        <Image
          width={294}
          height={217}
          className="object-contain"
          src="https://bytebank-assets.vercel.app/images/Ilustração_SignIn.svg"
          alt="ilustracao login"
        />
      </div>

      <h2 className="text-lg md:text-xl font-bold mb-2 text-center">Login</h2>

      {error && (
        <div className="w-full p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error.message || 'Email ou senha incorretos'}
        </div>
      )}

      <div className="w-full flex gap-4 flex-col">
        <InputText
          label="E-mail"
          {...register('email')}
          type="email"
          error={errors.email?.message}
          placeholder="Digite seu e-mail"
          disabled={isPending}
        />

        <InputText
          label="Senha"
          {...register('password')}
          type="password"
          placeholder="Digite sua senha"
          error={errors.password?.message}
          disabled={isPending}
        />

        <button
          type="button"
          className="text-success text-sm underline hover:text-primary text-left disabled:opacity-50"
          disabled={isPending}
        >
          Esqueci a senha!
        </button>
      </div>

      <div className="w-full flex justify-center mt-2">
        <Button
          type="submit"
          value={isPending ? 'Entrando...' : 'Acessar'}
          className="w-full !bg-success hover:!bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending}
        />
      </div>

      {isPending && (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-success"></div>
          <span>Autenticando...</span>
        </div>
      )}
    </form>
  );
};

export default SignInForm;
