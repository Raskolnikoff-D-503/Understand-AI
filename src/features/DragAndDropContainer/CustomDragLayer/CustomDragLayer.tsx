import React, {CSSProperties} from 'react';
import {useDragLayer, XYCoord} from 'react-dnd';
import {BoxDragPreview} from './BoxDragPreview';

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  height: '100%',
};

const getItemStyles = (initialOffset: XYCoord | null, currentOffset: XYCoord | null) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let {x, y} = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

const getElementWidthById = (id: string): string => {
  const element = document.getElementById(id);
  const styles = element && getComputedStyle(element);

  return styles?.width ?? '0px';
};

export const CustomDragLayer = () => {
  const {isDragging, item, initialOffset, currentOffset} = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <div style={{...layerStyles, width: getElementWidthById(item.props.id)}}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <BoxDragPreview>{item}</BoxDragPreview>
      </div>
    </div>
  );
};
