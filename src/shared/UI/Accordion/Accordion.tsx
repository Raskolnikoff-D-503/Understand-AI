import React, {ReactNode, useCallback, useState} from 'react';
import {Divider, Title} from '@/shared/UI';
import {ArrowIcon, DraggableIcon} from '@/shared/icons';
import {SIZE} from '@/shared/constants';

import './Accordion.scss';

type Props = {
  title: string;
  children: ReactNode;
  open?: boolean;
  isDraggable?: boolean;
};

export const Accordion = ({title, children, open = false, isDraggable = false}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="accordion">
      <div
        className={`accordion__title-container ${
          isDraggable ? 'accordion__title-container--draggable' : ''
        }`}
        onClick={() => handleClick()}
      >
        <Title size={SIZE.SMALL} noPadding>
          {title}
        </Title>
        {isDraggable ? (
          <DraggableIcon />
        ) : (
          <div className={`accordion__icon-wrapper ${isOpen ? 'accordion__icon-wrapper--up' : ''}`}>
            <ArrowIcon />
          </div>
        )}
      </div>
      <Divider className={`accordion__divider ${!isOpen ? 'accordion__divider--hidden' : ''}`} />
      <div
        className={`accordion__content ${
          !isOpen || isDraggable ? 'accordion__content--hidden' : ''
        }`}
      >
        {children}
      </div>
      <Divider />
    </div>
  );
};
