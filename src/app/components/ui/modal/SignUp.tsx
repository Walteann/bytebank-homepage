import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import InputText from "../input-text/InputText";
import Button from "../button/Button";
import { signUp } from "@/app/services/auth";

const signUpSchema = z.object({
	username: z
		.string()
		.min(3, "O nome precisa ter no mínimo 3 caracteres")
		.nonempty("Nome é obrigatório"),
	email: z
		.email("Dado incorreto. Revise e digite novamente.")
		.nonempty("Email é obrigatório"),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
	});

	const onSubmit = (data: SignUpSchema) => {
		signUp(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-3 relative py-[26px] overflow-y-auto scroll-thin max-h-[85vh] md:max-h-none md:w-[445px] md:py-[40px] md:items-center md:justify-center lg:md:w-[589px]"
		>
			<div className="w-full relative w-[294px] h-[217px] md:w-[354.97px] md:h-[261.59px] flex items-center">
				<Image
					fill
					className="object-cover !relative"
					src="https://bytebank-assets.vercel.app/images/Ilustração_SignUp.svg"
					alt="ilustracao login"
				/>
			</div>
			<h2 className="text-xl font-bold mb-4">
				Preencha os campos abaixo para criar sua conta corrente!
			</h2>

			<div className="w-full flex gap-[24px] flex-col">
				<InputText
					{...register("username")}
					label="Nome"
					type="text"
					placeholder="Digite seu nome completo"
					error={errors.username?.message}
				/>

				<InputText
					label="E-mail"
					type="email"
					placeholder="Digite seu nome completo"
					{...register("email")}
					error={errors.email?.message}
				/>

				<InputText
					label="Senha"
					type="password"
					{...register("password")}
					placeholder="Digite seu nome completo"
					className="md:w-[280px]"
					error={errors.password?.message}
				/>
			</div>

			<div className="w-full flex justify-center">
				<Button
					onClick={handleSubmit(onSubmit)}
					value="Criar conta"
					className="max-w-fit !bg-accent hover:!bg-primary md:!max-w-none"
				/>
			</div>
		</form>
	);
};

export default SignUp;