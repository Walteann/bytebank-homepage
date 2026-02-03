import Image from 'next/image';
import { HeroButtons } from '@/features/home/components/HeroButtons';
import { AdvantagesSection } from '@/features/home/components/AdvantagesSection';

const BYTEBANK_ASSETS = 'https://bytebank-assets.vercel.app';

export default function Home() {
  return (
    <section className="h-auto flex flex-col bg-gradient-to-b from-[#004D61] to-[#FFFFFF] items-center">
      <div className="w-full max-w-[1200px] px-[24px] py-[40px] flex flex-col items-center justify-content md:gap-[16px] lg:flex-row lg:flex-wrap">
        <h2 className="font-bold text-xl text-center md:w-[436px]">
          Experimente mais liberdade no controle da sua vida financeira. Crie
          sua conta com a gente!
        </h2>
        <div className="relative w-full h-[240px] my-[16px] md:w-[600px] md:h-[374.06px]">
          <Image
            fill
            className="object-cover"
            src={`${BYTEBANK_ASSETS}/images/Ilustração_Banner.svg`}
            alt="ilustracao banner"
            priority
          />
        </div>

        <HeroButtons />

        <AdvantagesSection />
      </div>
    </section>
  );
}
