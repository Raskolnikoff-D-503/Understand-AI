import React, {useCallback, useMemo, useState} from 'react';
import {useAppSelector} from '@/app/store';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {useGetChatGPTMessageMutation} from './api/hooks';
import {CreateResponse} from '@/features';
import {
  Button,
  Card,
  List,
  Modal,
  TextContentLoader,
  Textarea,
  Error,
  EmptyState,
} from '@/shared/UI';
import {getMessage} from './utils';

import './ChatGPTWidget.scss';
import {isUndefined} from '@/shared/utils';

type Props = {
  id: string;
  className: string;
};

export const ChatGPTWidget = ({id, className}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [txt, setTxt] = useState<string>('');

  const isDraggable = useAppSelector(selectIsOnEdit);

  const [getChatGPTMessage, {data, isSuccess, isLoading, error}] = useGetChatGPTMessageMutation();
  const message = useMemo(() => getMessage(data), [data]);

  const onSend = useCallback(() => {
    getChatGPTMessage(txt);
  }, [txt]);

  const onOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Card id={id} className={className} title="Chat GPT" isDraggable={isDraggable}>
      <div className="chat-gpt-widget__container">
        <div className="chat-gpt-widget__controls">
          <Textarea value={txt} onChange={setTxt} placeholder="Send a message..." />
          <Button onClick={onSend} disabled={!txt || isLoading}>
            Send
          </Button>
        </div>
        <div className="chat-gpt-widget__list-wrapper">
          {isLoading && <TextContentLoader line={12} />}
          {error && <Error error={error} />}
          {!isLoading && !error && message ? (
            <List>
              <p>{message}</p>
            </List>
          ) : (
            <EmptyState message="No Data Yet..." />
          )}
        </div>
        <Button onClick={onOpenModal} disabled={!isSuccess}>
          Save Response
        </Button>
      </div>
      {!isUndefined(message) && (
        <Modal id="create-response-modal-form" isOpen={isOpen} handleModalClose={onCloseModal}>
          <CreateResponse data={{title: txt, content: message}} onClose={onCloseModal} />
        </Modal>
      )}
    </Card>
  );
};
