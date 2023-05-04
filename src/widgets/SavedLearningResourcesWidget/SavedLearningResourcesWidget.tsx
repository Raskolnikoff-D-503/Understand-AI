import React, {useCallback, useMemo, useState} from 'react';
import {useAppSelector} from '@/app/store';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {useLocalStorage} from '@/app/services/localStorageController/hooks';
import {DragAndDropContainer} from '@/features';
import {Accordion, Card, CustomAnchor, EmptyState, List, Title, ToggleSwitch} from '@/shared/UI';
import {removeEmojis} from '@/shared/utils';
import {SIZE} from '@/shared/constants';

import './SavedLearningResourcesWidget.scss';

type Props = {
  id: string;
  className: string;
};

type ItemType = {
  id: string;
  className: string;
  Component: ({id, className}: Props) => JSX.Element;
};

export const SavedLearningResourcesWidget = ({id, className}: Props) => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);

  const isDraggable = useAppSelector(selectIsOnEdit);

  const [items, setItems] = useLocalStorage<
    {
      id: string;
      directory: string;
      content: {id: string; title: string; excerpt: string; url: string}[];
    }[]
  >('learning-resources', []);

  const configuratedItems = useMemo<ItemType[]>(
    () =>
      items
        ? items.map<ItemType>((item) => ({
            id: item.id,
            className: 'saved-learning-resources-widget__item',
            Component: ({id, className}) => (
              <div id={id} className={className}>
                <Accordion title={item.directory} isDraggable={isOnEdit}>
                  {item.content.map((resource) => (
                    <CustomAnchor key={resource.id} href={resource.url}>
                      <li className="saved-learning-resources-widget__list-item">
                        <Title size={SIZE.SMALL} noPadding>
                          {resource.title}
                        </Title>
                        <p>{removeEmojis(resource.excerpt)}</p>
                      </li>
                    </CustomAnchor>
                  ))}
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
    <Card id={id} className={className} isDraggable={isDraggable} title="Saved Learning Resources">
      <div className="saved-learning-resources-widget">
        {Boolean(configuratedItems.length) && (
          <>
            <div className="saved-learning-resources-widget__toggle-switch-wrapper">
              <ToggleSwitch
                name="saved-learning-resources-widget"
                checked={isOnEdit}
                onChange={setIsOnEdit}
              />
            </div>

            {isOnEdit && (
              <DragAndDropContainer
                className="saved-learning-resources-widget__drag-and-drop-container"
                data={configuratedItems}
                updateDataHandler={updateDataHandler}
              />
            )}
            {!isOnEdit && (
              <List className="saved-learning-resources-widget__container">
                {configuratedItems.map((item) => {
                  const {id, className, Component} = item;

                  return <Component key={id} id={id} className={className} />;
                })}
              </List>
            )}
          </>
        )}
        {!configuratedItems.length && <EmptyState message="The List Is Empty" />}
      </div>
    </Card>
  );
};
