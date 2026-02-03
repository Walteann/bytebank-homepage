'use client';

import { create } from 'zustand';

type ModalType = 'signin' | 'signup' | null;

interface ModalState {
  activeModal: ModalType;
  openModal: (type: Exclude<ModalType, null>) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  openModal: (type) => set({ activeModal: type }),
  closeModal: () => set({ activeModal: null }),
}));
