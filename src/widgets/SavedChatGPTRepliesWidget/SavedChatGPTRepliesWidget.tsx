import React, {useCallback, useMemo, useState} from 'react';
import {WidgetDataType} from '@/shared/types';
import {useAppSelector} from '@/app/store';
import {useLocalStorage} from '@/app/services/localStorageController/hooks';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {EditRegimeSwitcher} from '@/features';
import {Accordion, Card, EmptyState, List, ToggleSwitch} from '@/shared/UI';

import './SavedChatGPTRepliesWidget.scss';
import {DeleteIcon} from '@/shared/icons';

type Props = {
  id: string;
  className: string;
};

export const SavedChatGPTRepliesWidget = ({id, className}: Props) => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);

  const isDraggable = useAppSelector(selectIsOnEdit);

  const [items, setItems] = useLocalStorage<{id: string; title: string; content: string}[]>(
    'responses',
    [],
  );

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
                    <div
                      className="saved-chat-gpt-replies-widget__icon-wrapper"
                      onClick={() => onDeleteClick(id)}
                    >
                      <DeleteIcon />
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
    </Card>
  );
};
