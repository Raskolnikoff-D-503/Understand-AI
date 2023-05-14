import React, {useCallback, useMemo, useState} from 'react';
import {useAppSelector} from '@/app/store';
import {useLocalStorage} from '@/app/services/localStorageController/hooks';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {DragAndDropContainer} from '@/features';
import {Accordion, Card, EmptyState, List, Switch} from '@/shared/UI';

import './SavedChatGPTRepliesWidget.scss';

type Props = {
  id: string;
  className: string;
};

type ItemType = {
  id: string;
  className: string;
  Component: ({id, className}: Props) => JSX.Element;
};

export const SavedChatGPTRepliesWidget = ({id, className}: Props) => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);

  const isDraggable = useAppSelector(selectIsOnEdit);

  const [items, setItems] = useLocalStorage<{id: string; title: string; content: string}[]>(
    'responses',
    [],
  );

  const configuratedItems = useMemo<ItemType[]>(
    () =>
      items
        ? items.map<ItemType>((item) => ({
            id: item.id,
            className: 'saved-chat-gpt-replies-widget__item',
            Component: ({id, className}) => (
              <div id={id} className={className}>
                <Accordion title={item.title} isDraggable={isOnEdit}>
                  <p>{item.content}</p>
                </Accordion>
              </div>
            ),
          }))
        : [],
    [items, isOnEdit],
  );

  const updateDataHandler = useCallback(
    (data: ItemType[]) => {
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
              <Switch isToggled={isOnEdit} onToggle={() => setIsOnEdit(!isOnEdit)} />
            </div>

            {isOnEdit && (
              <DragAndDropContainer
                className="saved-chat-gpt-replies-widget__drag-and-drop-container"
                data={configuratedItems}
                updateDataHandler={updateDataHandler}
              />
            )}
            {!isOnEdit && (
              <List className="saved-chat-gpt-replies-widget__container">
                {configuratedItems.map((item) => {
                  const {id, className, Component} = item;

                  return <Component key={id} id={id} className={className} />;
                })}
              </List>
            )}
          </>
        )}
        {!configuratedItems.length && <EmptyState message="No Saved Data Yet" />}
      </div>
    </Card>
  );
};
