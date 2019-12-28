import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { Sort as SortIcon, SortUp as SortUpIcon, SortDown as SortDownIcon } from '../icons';
import { SortableItem } from './SortableItem';

export const SortableList = SortableContainer(({ items, onSort, onSortChange }) => {
  return (
    <ul className="list-group">
      {items.map((value, index) => {
        let icon = <SortIcon color="white" title="Aucun tri" onSort={onSort} />;
        if (value.way === 'up') {
          icon = <SortUpIcon color="white" title="Tri croissant" onSort={onSort} />;
        } else {
          if (value.way === 'down') {
            icon = <SortDownIcon color="white" title="Tri décroissant" onSort={onSort} />;
          }
        }
        return (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={value.label}
            way={icon}
            onSortChange={() => {
              onSortChange(value);
            }}
          />
        );
      })}
    </ul>
  );
});
