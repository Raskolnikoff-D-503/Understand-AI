import React, {useCallback, useMemo, useState} from 'react';
import {Nullable, WidgetDataType} from '@/shared/types';
import {useAppSelector} from '@/app/store';
import {ResponseItem, useLocalStorage} from '@/app/services/localStorageController/hooks';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {EditRegimeSwitcher, EditResponse} from '@/features';
import {Accordion, Card, EmptyState, List, Modal, ToggleSwitch} from '@/shared/UI';
import {isNull} from '@/shared/utils';
import {DeleteIcon, EditIcon} from '@/shared/icons';

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

  const [items, setItems] = useLocalStorage<ResponseItem[]>('responses', []);

  const onOpenModal = useCallback((data: ResponseItem) => {
    setCurrentItem(data);
    setIsOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setCurrentItem(null);
    setIsOpen(false);
  }, []);

  const onDeleteClick = useCallback(
    (id: string) => {
      const filteredItems = items.filter((item) => item.id !== id);
      setItems(filteredItems);
    },
    [items],
  );

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
                    <div className="saved-chat-gpt-replies-widget__icon-container">
                      <div
                        className="saved-chat-gpt-replies-widget__icon-wrapper"
                        onClick={() => onOpenModal(item)}
                      >
                        <EditIcon />
                      </div>
                      <div
                        className="saved-chat-gpt-replies-widget__icon-wrapper"
                        onClick={() => onDeleteClick(id)}
                      >
                        <DeleteIcon />
                      </div>
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
        const ids = data.map((item) => item.id);
        const sortedItems = items.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));

        setItems(sortedItems);
      }
    },
    [items],
  );

  return (
    <Card id={id} className={className} isDraggable={isDraggable} title="Saved Chat GPT Replies">
      <div className="saved-chat-gpt-replies-widget">
        {Boolean(configuratedItems.length) && (
          <>
            <div className="saved-chat-gpt-replies-widget__switch-wrapper">
              <ToggleSwitch isToggled={isOnEdit} onToggle={() => setIsOnEdit(!isOnEdit)} />
            </div>

            <EditRegimeSwitcher
              className="saved-chat-gpt-replies-widget__drag-and-drop-container"
              isOnEdit={isOnEdit}
              data={configuratedItems}
              updateDataHandler={updateDataHandler}
            >
              <List className="saved-chat-gpt-replies-widget__container">
                {configuratedItems.map((item) => {
                  const {id, className, Component} = item;

                  return <Component key={id} id={id} className={className} />;
                })}
              </List>
            </EditRegimeSwitcher>
          </>
        )}
        {!configuratedItems.length && <EmptyState message="No Saved Data Yet" />}
      </div>
      {!isNull(currentItem) && (
        <Modal id="edit-response-modal-form" isOpen={isOpen} handleModalClose={onCloseModal}>
          <EditResponse response={currentItem} onClose={onCloseModal} />
        </Modal>
      )}
    </Card>
  );
};
