import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../button/Button";
import InputText from "../input-text/InputText";
import Image from "next/image";

const signInSchema = z.object({
	email: z.email("Email inválido").nonempty("Email é obrigatório"),
	password: z.string().nonempty("Senha é obrigatória"),
});

type SignInSchema = z.infer<typeof signInSchema>;

const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = (data: SignInSchema) => {
		console.log("Form enviado:", data);
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
					src="/images/Ilustração_SignIn.svg"
					alt="ilustracao login"
				/>
			</div>
			<h2 className="text-xl font-bold mb-4">Login</h2>

			<div className="w-full flex gap-[24px] flex-col">
				<InputText
					label="E-mail"
					{...register("email")}
					type="email"
                    error={errors.email?.message}
					placeholder="Digite seu nome completo"
				/>

				<InputText
					label="Senha"
					{...register("password")}
					type="password"
					placeholder="Digite seu nome completo"
					className="md:w-[280px]"
                    error={errors.password?.message}
				/>

				<a
					className="text-success text-sm underline hover:text-primary"
					href="#"
				>
					Esqueci a senha!
				</a>
			</div>

			<div className="w-full flex justify-center">
				<Button
                    onClick={handleSubmit(onSubmit)}
					value="Acessar"
					className="max-w-fit !bg-success hover:!bg-primary md:!max-w-none"
				/>
			</div>
		</form>
	);
};

export default SignIn;