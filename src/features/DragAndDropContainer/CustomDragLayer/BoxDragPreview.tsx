import React, {CSSProperties, ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

const styles: CSSProperties = {
  display: '',
};

export const BoxDragPreview = ({children}: Props) => {
  return <div style={styles}>{children}</div>;
};
