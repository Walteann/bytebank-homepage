import CardProduct from '@/shared/components/ui/CardProduct/CardProduct';

const BYTEBANK_ASSETS = 'https://bytebank-assets.vercel.app';

const advantages = [
  {
    id: 1,
    image: `${BYTEBANK_ASSETS}/images/Icone_Presente.svg`,
    alt: 'icone presente',
    title: 'Conta e cartão gratuitos',
    description:
      'Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.',
  },
  {
    id: 2,
    image: `${BYTEBANK_ASSETS}/images/Icone_Saque.svg`,
    alt: 'icone Saques sem custo',
    title: 'Saques sem custo',
    description:
      'Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.',
  },
  {
    id: 3,
    image: `${BYTEBANK_ASSETS}/images/Icone_Pontos.svg`,
    alt: 'icone Programa de pontos',
    title: 'Programa de pontos',
    description:
      'Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!',
  },
  {
    id: 4,
    image: `${BYTEBANK_ASSETS}/images/Icone_Presente.svg`,
    alt: 'icone Seguro Dispositivos',
    title: 'Seguro Dispositivos',
    description:
      'Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.',
  },
];

export function AdvantagesSection() {
  return (
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
  );
}
