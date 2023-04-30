import React from 'react';
import {Card} from '@/shared/UI';

import './SavedChatGPTRepliesWidget.scss';

type Props = {
  id: string;
  className: string;
};

export const SavedChatGPTRepliesWidget = ({id, className}: Props) => {
  return (
    <Card id={id} className={className} title="Saved Chat GPT Replies">
      <div className="saved-chat-gpt-replies-widget__container"></div>
    </Card>
  );
};
