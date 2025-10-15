"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import Button from "../button/Button";
import InputText from "../input-text/InputText";
import Image from "next/image";
import { signInAction } from "@/app/services/action";
const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const signInSchema = z.object({
	email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
	password: z.string().min(1, "Senha é obrigatória"),
});

type SignInSchema = z.infer<typeof signInSchema>;

const SignIn = () => {
	const [isPending, startTransition] = useTransition();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = async (data: SignInSchema) => {
		setErrorMessage(null);

		startTransition(async () => {
			try {
				const result = await signInAction(data);

				if (result.success && result.token) {
					console.log(`✅ Login bem-sucedido! Redirecionando... ${NEXT_PUBLIC_APP_URL} ${result.token}`);
					const encodedToken = btoa(result.token);
					const appUrl = NEXT_PUBLIC_APP_URL || "http://localhost:3000";
					window.location.href = `${appUrl}/?auth=${encodedToken}`;
				} else {
					setErrorMessage(result.message || "Email ou senha incorretos");
				}
			} catch (error) {
				console.error("❌ Erro no login:", error);
				setErrorMessage("Erro inesperado ao fazer login");
			}
		});
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

			{errorMessage && (
				<div className="w-full p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
					{errorMessage}
				</div>
			)}

			<div className="w-full flex gap-4 flex-col">
				<InputText
					label="E-mail"
					{...register("email")}
					type="email"
					error={errors.email?.message}
					placeholder="Digite seu e-mail"
					disabled={isPending}
				/>

				<InputText
					label="Senha"
					{...register("password")}
					type="password"
					placeholder="Digite sua senha"
					error={errors.password?.message}
					disabled={isPending}
				/>

				<button
					type="button"
					className="text-success text-sm underline hover:text-primary text-left disabled:opacity-50"
					onClick={() => console.log('Recuperar senha')}
					disabled={isPending}
				>
					Esqueci a senha!
				</button>
			</div>

			<div className="w-full flex justify-center mt-2">
				<Button
					type="submit"
					value={isPending ? "Entrando..." : "Acessar"}
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

export default SignIn;