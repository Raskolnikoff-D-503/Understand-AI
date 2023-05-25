import React from 'react';
import {IconButton} from '@/shared/UI';
import {SaveIcon, SavedIcon} from '@/shared/icons';

type Props = {
  inFavorites: boolean;
  onSave: () => void;
  onDelete: () => void;
};

export const Favorites = ({inFavorites = false, onSave, onDelete}: Props) => {
  if (inFavorites) {
    return <IconButton onClick={onDelete} icon={<SavedIcon />} />;
  }

  return <IconButton onClick={onSave} icon={<SaveIcon />} />;
};
