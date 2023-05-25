import React from 'react';
import {WidgetDataType} from '@/shared/types';
import {EditRegimeSwitcher} from '@/features';
import {EmptyState, List, ToggleSwitch} from '@/shared/UI';

import './SavedInfo.scss';

type Props = {
  data: WidgetDataType[];
  isOnEdit: boolean;
  isDraggable: boolean;
  onToggle: () => void;
  onUpdate: (data: WidgetDataType[]) => void;
};

export const SavedInfo = ({data, isOnEdit, isDraggable, onToggle, onUpdate}: Props) => {
  return (
    <div className="saved-info">
      {Boolean(data.length) && (
        <>
          <div className="saved-info__switch-wrapper">
            <ToggleSwitch isToggled={isOnEdit} onToggle={onToggle} disabled={isDraggable} />
          </div>

          <EditRegimeSwitcher
            className="saved-info__drag-and-drop-container"
            isOnEdit={isOnEdit}
            data={data}
            updateDataHandler={onUpdate}
          >
            <List className="saved-info__container">
              {data.map((item) => {
                const {id, className, Component} = item;

                return <Component key={id} id={id} className={className} />;
              })}
            </List>
          </EditRegimeSwitcher>
        </>
      )}
      {!data.length && <EmptyState message="No Saved Data Yet" />}
    </div>
  );
};
