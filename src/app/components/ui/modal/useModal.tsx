"use client";

import { useState, ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

function BaseModal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-[24px] md:px-[60px] overflow-y-auto">
      <div className="bg-white shadow-lg w-full p-6 relative my-8 max-h-[90vh] overflow-y-auto lg:w-[792px]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black hover:cursor-pointer z-10"
        > 
          <FaTimes size={24}/>
        </button>
        {children}
      </div>
    </div>
  );
}

function useModal(content: ReactNode) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const Modal = isOpen ? (
    <BaseModal onClose={close}>{content}</BaseModal>
  ) : null;

  return { open, close, Modal };
}

export default useModal;