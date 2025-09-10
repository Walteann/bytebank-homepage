"use client";

import Link from "next/link";
import Image from "next/image";
import { MdMenu } from "react-icons/md";
import Button from "../ui/button/Button";
import { useModal } from "../ui/modal/useModal";
import { SignUp } from "../ui/modal/SignUp";
import { SignIn } from "../ui/modal/SignIn";

const Header = () => {
	const { open: openSignUp, Modal: ModalSignUp } = useModal(<SignUp />);
	const { open: openSignIn, Modal: ModalSignIn } = useModal(<SignIn />);

	return (
		<header className="w-full h-[96px] bg-black flex justify-center">
			<div className="w-full max-w-[1200px] flex items-center md:justify-between md:gap-[50px] p-[24px] md:px-[35px]">
				<div className="flex items-center md:gap-[24px] lg:gap-[72px]">
					<Image
						className="hidden md:block lg:hidden"
						src="/logo/Logo_mini.svg"
						alt="Logo bytebank"
						width={26.6}
						height={26.6}
					/>
					<Image
						className="hidden md:hidden lg:block"
						src="/logo/Logo_1.svg"
						alt="Logo bytebank"
						width={145.6}
						height={32}
					/>

					<div className="hidden md:block">
						<ul className="flex text-success gap-[24px]">
							<li>Sobre</li>
							<li>Serviços</li>
						</ul>
					</div>
				</div>

				<div className="hidden md:flex md:flex flex-row gap-[16px] ">
					<Button
						className="bg-success text-white"
						value="Abrir conta"
						onClick={openSignUp}
					/>
					<Button
						className="bg-transparent !text-success border-2 border-success hover:bg-white hover:border-white hover:!text-black"
						value="Já tenho conta"
						onClick={openSignIn}
					/>
				</div>

				<MdMenu className="md:hidden text-success text-[32px] mr-auto" />

				<Link href="/" className="pr-[3.4px] md:hidden">
					<Image
						src="/logo/Logo_1.svg"
						alt="Logo bytebank"
						width={145.6}
						height={32}
					/>
				</Link>
			</div>

			{ModalSignUp}
			{ModalSignIn}
		</header>
	);
};

export default Header;
