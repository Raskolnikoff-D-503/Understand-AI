import React, {ReactNode} from 'react';
import {WidgetProps} from '@/shared/types';
import {DragAndDropContainer} from '@/features';

type Props = {
  className: string;
  isOnEdit: boolean;
  data: WidgetProps[];
  updateDataHandler: (data: WidgetProps[]) => void;
  children: ReactNode;
};

export const DnDRegimeSwitcher = ({
  className,
  isOnEdit,
  data,
  updateDataHandler,
  children,
}: Props) => {
  return isOnEdit ? (
    <DragAndDropContainer data={data} updateDataHandler={updateDataHandler} className={className} />
  ) : (
    <>{children}</>
  );
};
