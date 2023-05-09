import React, {useCallback, useMemo, useState} from 'react';
import {LearningResourceType} from '../LearningResourcesWidget/LearningResourcesWidget';
import {useAppSelector} from '@/app/store';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {useLocalStorage} from '@/app/services/localStorageController/hooks';
import {DragAndDropContainer} from '@/features';
import {Accordion, Card, CustomAnchor, EmptyState, List, Switch, Title} from '@/shared/UI';
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
      items: LearningResourceType[];
    }[]
  >('learning-resources', []);

  const configuratedItems = useMemo<ItemType[]>(
    () =>
      items
        ? items
            .filter((item) => item.items.length)
            .map<ItemType>((item) => {
              return {
                id: item.id,
                className: 'saved-learning-resources-widget__item',
                Component: ({id, className}) => (
                  <div id={id} className={className}>
                    <Accordion title={item.id} isDraggable={isOnEdit}>
                      {item.items.map((resource) => (
                        <CustomAnchor key={resource.id} href={resource.url}>
                          <li className="saved-learning-resources-widget__list-item">
                            <Title size={SIZE.SMALL} noPadding>
                              {resource.title}
                            </Title>
                            <p>{removeEmojis(resource.excerpt)}</p>
                          </li>
                        </CustomAnchor>
                      ))}
                    </Accordion>
                  </div>
                ),
              };
            })
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
            <div className="saved-learning-resources-widget__switch-wrapper">
              <Switch isToggled={isOnEdit} onToggle={() => setIsOnEdit(!isOnEdit)} />
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
