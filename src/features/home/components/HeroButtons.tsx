'use client';

import Button from '@/shared/components/ui/Button/Button';
import { useModalStore } from '@/shared/hooks/useModalStore';

export function HeroButtons() {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="w-full flex justify-center gap-[24px] md:hidden">
      <Button
        value="Abrir conta"
        className="!bg-black !px-[28.4px] text-nowrap"
        onClick={() => openModal('signup')}
      />
      <Button
        value="Já tenho conta"
        className="bg-transparent !px-[28.4px] text-nowrap !text-black border-2 border-black hover:bg-white hover:border-white hover:!text-black"
        onClick={() => openModal('signin')}
      />
    </div>
  );
}
