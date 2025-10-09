"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import Image from "next/image";
import InputText from "../input-text/InputText";
import Button from "../button/Button";
import { signUp } from "@/app/services/auth";

const signUpSchema = z.object({
	username: z
		.string()
		.min(3, "O nome precisa ter no mínimo 3 caracteres")
		.min(1, "Nome é obrigatório"),
	email: z
		.string()
		.email("Dado incorreto. Revise e digite novamente.")
		.min(1, "Email é obrigatório"),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

const SignUp = () => {
	const [isPending, startTransition] = useTransition();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
	});

	const onSubmit = (data: SignUpSchema) => {
		setErrorMessage(null);
		setSuccessMessage(null);

		startTransition(async () => {
			try {
				await signUp(data);
				setSuccessMessage("Conta criada com sucesso! Faça login para continuar.");
				reset(); // Limpa o formulário
			} catch (error) {
				console.error("❌ Erro ao criar conta:", error);
				setErrorMessage("Erro ao criar conta. Tente novamente.");
			}
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

			{errorMessage && (
				<div className="w-full p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
					{errorMessage}
				</div>
			)}

			{successMessage && (
				<div className="w-full p-2 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
					{successMessage}
				</div>
			)}

			<div className="w-full flex gap-4 flex-col">
				<InputText
					{...register("username")}
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
					{...register("email")}
					error={errors.email?.message}
					disabled={isPending}
				/>

				<InputText
					label="Senha"
					type="password"
					{...register("password")}
					placeholder="Digite sua senha"
					error={errors.password?.message}
					disabled={isPending}
				/>
			</div>

			<div className="w-full flex justify-center mt-2">
				<Button
					type="submit"
					value={isPending ? "Criando conta..." : "Criar conta"}
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

export default SignUp;