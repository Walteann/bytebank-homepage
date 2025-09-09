import Image from "next/image";
import Button from "./components/ui/button/Button";
import CardProduct from "./components/ui/card-product/CardProduct";
export default function Home() {
	const advantages = [
		{
			id: 1,
			image: "/images/Icone_Presente.svg",
			alt: "icone presente",
			title: "Conta e cartão gratuitos",
			description:
				"Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.",
		},
		{
			id: 2,
			image: "/images/Icone_Saque.svg",
			alt: "icone Saques sem custo",
			title: "Saques sem custo",
			description:
				"Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.",
		},
		{
			id: 3,
			image: "/images/Icone_Pontos.svg",
			alt: "icone Programa de pontos",
			title: "Programa de pontos",
			description:
				"Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!",
		},
		{
			id: 4,
			image: "/images/Icone_Presente.svg",
			alt: "icone Seguro Dispositivos",
			title: "Seguro Dispositivos",
			description:
				"Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.",
		},
	];

	return (
		<section className="h-auto flex flex-col bg-gradient-to-b from-[#004D61] to-[#FFFFFF] items-center">
			<div className="w-full max-w-[1200px] px-[24px] py-[40px] flex flex-col items-center justify-content md:gap-[16px] lg:flex-row lg:flex-wrap">
				<h2 className="font-bold text-xl text-center md:w-[436px]">
					Experimente mais liberdade no controle da sua vida
					financeira. Crie sua conta com a gente!
				</h2>
				<div className="relative w-full h-[240px] my-[16px] md:w-[600px] md:h-[374.06px]">
					<Image
						fill
						className="object-cover"
						src="/images/Ilustração_Banner.svg"
						alt="ilustracao banner"
					/>
				</div>

				<div className="w-full flex justify-center gap-[24px] md:hidden">
					<Button
						value="Abrir conta"
						className="!bg-black !px-[28.4px] text-nowrap"
					/>
					<Button
						value="Já tenho conta"
						className="bg-transparent !px-[28.4px] text-nowrap !text-black border-2 border-black hover:bg-white hover:border-white hover:!text-black"
					/>
				</div>

				<div className="w-full flex flex-col justify-center items-center gap-[40px] mb-[20px] lg:mb-[70px]">
					<h3 className="text-black font-bold text-lg pt-[32px] md:text-xl">
						Vantagens do nosso banco:
					</h3>

					<div className="w-full flex flex-col justify-center items-center gap-[40px] md:flex-row md:w-[650px] md:flex-wrap md:items-stretch lg:w-full lg:gap-[24px] lg:flex-nowrap">
						{advantages.map((item) => (
							<CardProduct
								key={item.id}
								image={item.image}
								alt={item.alt}
								title={item.title}
								description={item.description}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
