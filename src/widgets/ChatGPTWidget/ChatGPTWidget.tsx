import React, {useState} from 'react';
import {useGetChatGPTMessageMutation} from '@/app/services/chatGPT/hooks';
import {Card, Textarea} from '@/shared/UI';

import './ChatGPTWidget.scss';

type Props = {
  id: string;
  className: string;
};

export const ChatGPTWidget = ({id, className}: Props) => {
  const [txt, setTxt] = useState<string>('');

  const [getChatGPTMessage, response] = useGetChatGPTMessageMutation();

  console.log(getChatGPTMessage, response);

  return (
    <Card id={id} className={`chat-gpt-widget ${className}`} title="Chat GPT" isDraggable>
      <div>
        <div>
          <Textarea value={txt} onChange={setTxt} />
          <button onClick={() => getChatGPTMessage(txt)}>TEST</button>
        </div>
        <p>{response?.data?.choices.map((item) => item.message.content)}</p>
      </div>
    </Card>
  );
};
