// src/components/useModal.tsx
"use client";

import { useState, ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

function BaseModal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-[24px] md:px-[60px]">
      <div className="bg-white shadow-lg w-full p-6 relative h-full flex justify-center lg:w-[792px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        > 
          <FaTimes size={24}/>
        </button>
        {children}
      </div>
    </div>
  );
}

export function useModal(content: ReactNode) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const Modal = isOpen ? (
    <BaseModal onClose={close}>{content}</BaseModal>
  ) : null;

  return { open, close, Modal };
}
