import React from 'react';
import {NoDataIcon} from '@/shared/icons';

import './EmptyState.scss';

export const EmptyState = () => {
  return (
    <div className="empty-state">
      <NoDataIcon />
      <p>No Data Avialable</p>
    </div>
  );
};
