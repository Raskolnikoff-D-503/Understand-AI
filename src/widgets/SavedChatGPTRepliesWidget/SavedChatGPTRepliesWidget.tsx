import React, {useCallback, useMemo, useState} from 'react';
import {Nullable, WidgetDataType} from '@/shared/types';
import {useAppSelector} from '@/app/store';
import {
  LOCAL_STORAGE,
  ResponseItem,
  useLocalStorage,
} from '@/app/services/localStorageController/hooks';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {EditResponse, SavedInfo} from '@/features';
import {Accordion, Card, IconButton, Modal} from '@/shared/UI';
import {DeleteIcon, EditIcon} from '@/shared/icons';
import {isNull} from '@/shared/utils';
import {getSortedResponseItems} from './utils';

import './SavedChatGPTRepliesWidget.scss';

type Props = {
  id: string;
  className: string;
};

export const SavedChatGPTRepliesWidget = ({id, className}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Nullable<ResponseItem>>(null);

  const isDraggable = useAppSelector(selectIsOnEdit);

  const [items, setItems] = useLocalStorage<ResponseItem[]>(LOCAL_STORAGE.RESPONSES, []);

  const onToggle = useCallback(() => {
    setIsOnEdit(!isOnEdit);
  }, [isOnEdit]);

  const onDelete = useCallback(
    (id: string) => {
      const filteredItems = items.filter((item) => item.id !== id);
      setItems(filteredItems);
    },
    [items],
  );

  const onOpenModal = useCallback((data: ResponseItem) => {
    setCurrentItem(data);
    setIsOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setCurrentItem(null);
    setIsOpen(false);
  }, []);

  const configuratedItems = useMemo<WidgetDataType[]>(
    () =>
      items
        ? items.map<WidgetDataType>((item) => ({
            id: item.id,
            className: 'saved-chat-gpt-replies-widget__item',
            Component: ({id, className}) => (
              <div id={id} className={className}>
                <Accordion title={item.title} isDraggable={isOnEdit}>
                  <div className="saved-chat-gpt-replies-widget__item-container">
                    <p>{item.content}</p>
                    <div className="saved-chat-gpt-replies-widget__buttons-container">
                      <IconButton onClick={() => onOpenModal(item)} icon={<EditIcon />} />
                      <IconButton onClick={() => onDelete(id)} icon={<DeleteIcon />} />
                    </div>
                  </div>
                </Accordion>
              </div>
            ),
          }))
        : [],
    [items, isOnEdit],
  );

  const updateDataHandler = useCallback(
    (data: WidgetDataType[]) => {
      if (items) {
        const sortedItems = getSortedResponseItems(items, data);

        setItems(sortedItems);
      }
    },
    [items],
  );

  return (
    <Card id={id} className={className} isDraggable={isDraggable} title="Saved Chat GPT Replies">
      <SavedInfo
        data={configuratedItems}
        isOnEdit={isOnEdit}
        isDraggable={isDraggable}
        onToggle={onToggle}
        onUpdate={updateDataHandler}
      />
      {!isNull(currentItem) && (
        <Modal id="edit-response-modal-form" isOpen={isOpen} handleModalClose={onCloseModal}>
          <EditResponse response={currentItem} onClose={onCloseModal} />
        </Modal>
      )}
    </Card>
  );
};
