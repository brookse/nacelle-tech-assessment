import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener('keydown', (e) => trapFocus(e, `${title} category modal`));
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener('keydown', (e) => trapFocus(e, `${title} category modal`));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  
  if (!isOpen) return;

  const trapFocus = (e: KeyboardEvent, modalId: string) => {
    const focusableElements = `button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])`;
    const modal = document.getElementById(modalId);
    if (!modal) return;
  
    if (e.key === 'Escape') onClose();
    if (e.key === 'Tab') {
      const focusableContent = modal.querySelectorAll(focusableElements);
      const firstElement = focusableContent[0] as HTMLElement;
      const lastElement = focusableContent[focusableContent.length - 1] as HTMLElement;

      // if the active element is not in the modal, focus the first element
      if (!modal.contains(document.activeElement)) {
        e.preventDefault();
        firstElement.focus();
      }

      // loop correctly between first and last
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }

  return (
    <div className='animate-fade-in animation-fade-out flex justify-center items-center z-50 fixed top-0 left-0'>
      <div role="presentation" className='h-screen w-screen bg-black bg-opacity-50' onClick={onClose}></div>

      <div role="dialog" id={`${title} category modal`} aria-label={`${title} category modal`} className='animate-fade-in fixed h-[100%] sm:max-h-[50%] w-full sm:w-1/2 p-4 overflow-y-scroll bg-white rounded-lg'>
        <div className='flex justify-between pb-4'>
          <h1 className='text-stone-700 text-xl font-semibold'>{title}</h1>
          <button onClick={onClose} aria-label='Close modal' className="hover:text-pink-500">✕</button>
        </div>
        
        {children}
      </div>
    </div>
  );
};