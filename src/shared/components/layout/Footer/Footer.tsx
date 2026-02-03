import Image from 'next/image';
import { FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white flex justify-center">
      <div className="w-[308px] md:w-full md:max-w-[1200px] flex flex-col gap-[32px] py-[24.2px] px-[38.5px] md:flex-row md:justify-center lg:justify-between lg:h-[224px] lg:items-center">
        <div className="max-w-max">
          <h4 className="font-bold mb-[16px]">Serviços</h4>
          <ul className="flex flex-col gap-[16px]">
            <li>Conta corrente</li>
            <li>Conta PJ</li>
            <li>Cartão de crédito</li>
          </ul>
        </div>

        <div className="max-w-max">
          <h4 className="font-bold mb-[16px]">Contato</h4>
          <ul className="flex flex-col gap-[16px]">
            <li>0800 004 250 08</li>
            <li>meajuda@bytebank.com.br</li>
            <li>ouvidoria@bytebank.com.br</li>
          </ul>
        </div>

        <div className="flex flex-col gap-[24px] max-w-max">
          <h4 className="font-bold">Desenvolvido por Alura</h4>

          <Image
            src="https://bytebank-assets.vercel.app/logo/Logo_white.svg"
            alt="logo bytebank white"
            width={145.6}
            height={32}
          />

          <div className="flex">
            <FaInstagram className="text-[32px] mr-[16px]" />
            <FaWhatsapp className="text-[32px] mr-[16px]" />
            <FaYoutube className="text-[32px]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
