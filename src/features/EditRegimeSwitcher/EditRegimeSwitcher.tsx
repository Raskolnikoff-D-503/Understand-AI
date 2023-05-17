import React, {ReactNode} from 'react';
import {WidgetDataType} from '@/shared/types';
import {DragAndDropContainer} from '@/features';

type Props = {
  className: string;
  isOnEdit: boolean;
  data: WidgetDataType[];
  updateDataHandler: (data: WidgetDataType[]) => void;
  children: ReactNode;
};

export const EditRegimeSwitcher = ({
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
