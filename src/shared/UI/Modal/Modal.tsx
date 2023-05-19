import React, {ReactNode, useEffect} from 'react';

import './Modal.scss';
import {createPortal} from 'react-dom';

type Props = {
  id: string;
  isOpen?: boolean;
  children: ReactNode;
  handleModalClose: () => void;
};

export const Modal = ({id, isOpen = false, children, handleModalClose}: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div id={id} className="modal__backdrop" onClick={handleModalClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
};
