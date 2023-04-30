import React, {ReactNode, useCallback, useState} from 'react';
import {Title} from '@/shared/UI';
import {ArrowIcon} from '@/shared/icons';
import {SIZE} from '@/shared/constants';

import './Accordion.scss';

type Props = {
  title: string;
  children: ReactNode;
  open?: boolean;
};

export const Accordion = ({title, children, open = false}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="accordion">
      <div className="accordion__title-container" onClick={() => handleClick()}>
        <Title size={SIZE.SMALL} noPadding>
          {title}
        </Title>
        <div className={`accordion__icon-wrapper accordion__icon-wrapper${isOpen && '--up'}`}>
          <ArrowIcon />
        </div>
      </div>
      <hr className={`accordion__divider accordion__divider${!isOpen && '--hidden'}`} />
      <div className={`accordion__content accordion__content${!isOpen && '--hidden'}`}>
        {children}
      </div>
    </div>
  );
};
