import React from 'react';
import {NoDataIcon} from '@/shared/icons';

import './EmptyState.scss';

type Props = {
  message?: string;
};

export const EmptyState = ({message = 'No Data Avialable'}: Props) => {
  return (
    <div className="empty-state">
      <NoDataIcon />
      <p>{message}</p>
    </div>
  );
};
