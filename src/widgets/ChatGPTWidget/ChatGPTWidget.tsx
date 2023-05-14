import React, {useCallback, useMemo, useState} from 'react';
import {useAppSelector} from '@/app/store';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {useGetChatGPTMessageMutation} from '@/app/services/chatGPT/hooks';
import {ResponseForm} from './ResponseForm';
import {Button, Card, List, Modal, TextContentLoader, Textarea, Error} from '@/shared/UI';

import './ChatGPTWidget.scss';

type Props = {
  id: string;
  className: string;
};

export const ChatGPTWidget = ({id, className}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [txt, setTxt] = useState<string>('');

  const isDraggable = useAppSelector(selectIsOnEdit);

  const [getChatGPTMessage, {data, isSuccess, isLoading, error}] = useGetChatGPTMessageMutation();

  const onCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const message = useMemo(() => data?.choices.map((item) => item.message.content)?.[0], [data]);

  return (
    <Card id={id} className={className} title="Chat GPT" isDraggable={isDraggable}>
      <div className="chat-gpt-widget__container">
        <div className="chat-gpt-widget__controls">
          <Textarea value={txt} onChange={setTxt} placeholder="Send a message..." />
          <Button onClick={() => getChatGPTMessage(txt)} disabled={!txt || isLoading}>
            Send
          </Button>
        </div>
        {isLoading && <TextContentLoader line={12} />}
        {error && <Error error={error} />}
        {isSuccess && (
          <>
            <div className="chat-gpt-widget__list-wrapper">
              <List>
                <p>{message}</p>
              </List>
            </div>
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Save Response
            </Button>
          </>
        )}
      </div>
      {isOpen && (
        <Modal id="response-modal-form" handleModalClose={onCloseModal}>
          <ResponseForm response={message} onClose={onCloseModal} />
        </Modal>
      )}
    </Card>
  );
};
