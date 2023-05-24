import React from 'react';
import {CustomAnchor, Title} from '@/shared/UI';
import {removeEmojis} from '@/shared/utils';
import {SIZE} from '@/shared/constants';

import './LearningResourceLinkItem.scss';

type Props = {
  url: string;
  title: string;
  excerpt: string;
};

export const LearningResourceLinkItem = ({url, title, excerpt}: Props) => {
  return (
    <CustomAnchor href={url}>
      <div className="learning-recources-link-item">
        <Title size={SIZE.SMALL} noPadding>
          {title}
        </Title>
        <p>{removeEmojis(excerpt)}</p>
      </div>
    </CustomAnchor>
  );
};
