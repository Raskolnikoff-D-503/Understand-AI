import React, {ReactNode} from 'react';

import './Modal.scss';
import {createPortal} from 'react-dom';

type Props = {
  id: string;
  children: ReactNode;
  handleModalClose: () => void;
};

export const Modal = ({id, children, handleModalClose}: Props) => {
  return createPortal(
    <div id={id} className="modal__backdrop" onClick={handleModalClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
};
