import Image from "next/image"
import InputText from "../input-text/InputText"
import Button from "../button/Button"
import InputCheckbox from "../input-checkbox/InputCheckbox"

export const SignUp = () => { 
    return (
        <form className="flex flex-col gap-3 relative py-[26px] overflow-y-auto scroll-thin max-h-[85vh] md:max-h-none md:w-[445px] md:py-[40px] md:items-center md:justify-center lg:md:w-[589px]">
            <div className="w-full relative w-[294px] h-[217px] md:w-[354.97px] md:h-[261.59px] flex items-center">
                <Image fill className="object-cover !relative" src="/images/Ilustração_Login.svg" alt="ilustracao login" />
            </div>
			<h2 className="text-xl font-bold mb-4">Preencha os campos abaixo para criar sua conta corrente!</h2>

            <div className="w-full flex gap-[24px] flex-col">
                <InputText label="Nome" name="Nome" type="text" placeholder="Digite seu nome completo"/>

                <InputText label="E-mail" name="E-mail" type="email" placeholder="Digite seu nome completo"/>

                <InputText label="Senha" name="Senha" type="password" placeholder="Digite seu nome completo" className="md:w-[280px]"/>

            </div>

            <div className="w-full py-[16px]">
                <InputCheckbox label="Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco."/>
            </div>

            <div className="w-full flex justify-center">
                <Button value="Criar conta" className="max-w-fit !bg-accent !hover:bg-primary !md:max-w-none"/>
            </div>

		</form>
    )
}