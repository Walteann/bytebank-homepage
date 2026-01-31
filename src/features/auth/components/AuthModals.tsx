'use client';

import { useModalStore } from '@/shared/hooks/useModalStore';
import Modal from '@/shared/components/ui/Modal/Modal';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default function AuthModals() {
  const { activeModal, closeModal } = useModalStore();

  if (!activeModal) return null;

  return (
    <Modal onClose={closeModal}>
      {activeModal === 'signin' && <SignInForm />}
      {activeModal === 'signup' && <SignUpForm />}
    </Modal>
  );
}
