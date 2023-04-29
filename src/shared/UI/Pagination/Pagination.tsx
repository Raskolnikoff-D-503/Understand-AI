import React from 'react';

import './Pagination.scss';

type Props = {
  currentPage: number;
  nextPage?: number;
  onPageChange: (currentPage: number) => void;
  className?: string;
};

export const Pagination = ({currentPage, nextPage = 0, onPageChange, className = ''}: Props) => {
  if (currentPage === 0) {
    return null;
  }

  const onNext = () => {
    onPageChange(nextPage ? nextPage : currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul className={`pagination-container ${className}`}>
      <li className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={onPrevious}>
        <div className="arrow left" />
      </li>
      <li className="pagination-item">{currentPage}</li>
      <li className={`pagination-item ${!nextPage ? 'disabled' : ''}`} onClick={onNext}>
        <div className="arrow right" />
      </li>
    </ul>
  );
};
