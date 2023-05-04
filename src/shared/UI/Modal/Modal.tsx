import React, {ReactNode, useEffect} from 'react';

import './Modal.scss';
import {createPortal} from 'react-dom';

type Props = {
  id: string;
  children: ReactNode;
  handleModalClose: () => void;
};

export const Modal = ({id, children, handleModalClose}: Props) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  return createPortal(
    <div id={id} className="modal__backdrop" onClick={handleModalClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
};
