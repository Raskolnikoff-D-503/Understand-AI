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

  const styles = getComputedStyle(document.getElementById(item.props.id)!);

  return (
    <div style={{...layerStyles, width: styles.width}}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <BoxDragPreview>{item}</BoxDragPreview>
      </div>
    </div>
  );
};
