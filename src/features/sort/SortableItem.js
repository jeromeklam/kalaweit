import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

export const SortableItem = SortableElement(({ value, way, onSortChange }) => {
  return (
    <li className="list-group-item">
      {value}{' '}
      <div className="sort-icon">
        {' '}
        <div onClick={onSortChange}>{way}</div>
      </div>
    </li>
  );
});
