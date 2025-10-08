"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import Button from "../button/Button";
import InputText from "../input-text/InputText";
import Image from "next/image";
import { signInAction } from "@/app/services/action";

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
					console.log("✅ Login bem-sucedido! Redirecionando...");
					const encodedToken = btoa(result.token);
					const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
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
			className="flex flex-col gap-3 relative py-[26px] overflow-y-auto scroll-thin max-h-[85vh] md:max-h-none md:w-[445px] md:py-[40px] md:items-center md:justify-start lg:md:w-[589px]"
		>
			<div className="w-full relative w-[294px] h-[217px] md:w-fit md:h-fit flex items-center">
				<Image
					fill
					className="object-cover !relative"
					src="https://bytebank-assets.vercel.app/images/Ilustração_SignIn.svg"
					alt="ilustracao login"
				/>
			</div>
			
			<h2 className="text-xl font-bold mb-4">Login</h2>

			{errorMessage && (
				<div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
					{errorMessage}
				</div>
			)}

			<div className="w-full flex gap-[24px] flex-col">
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
					className="md:w-[280px]"
					error={errors.password?.message}
					disabled={isPending}
				/>

				
				<a	className="text-success text-sm underline hover:text-primary"
					href="#"
				>
					Esqueci a senha!
				</a>
			</div>

			<div className="w-full flex justify-center">
				<Button
					type="submit"
					value={isPending ? "Entrando..." : "Acessar"}
					className="max-w-fit !bg-success hover:!bg-primary md:!max-w-none disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={isPending}
				/>
			</div>
		</form>
	);
};

export default SignIn;