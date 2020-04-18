import React from 'react';
import { 
  AddOne as AddOneIcon, 
  GetOne as GetOneIcon, 
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
} from '../icons';

export const getGlobalActions = ({ onClearFilters, onCreate }) => {
  return [
    {
      name: 'clear',
      label: 'Effacer',
      onClick: onClearFilters,
      theme: 'secondary',
      icon: <FilterClearIcon color="white" />,
    },
    {
      name: 'create',
      label: 'Ajouter',
      onClick: onCreate,
      theme: 'primary',
      icon: <AddOneIcon color="white" />,
    },
  ];
};

export const getInlineActions = ({ onGetOne, onDelOne }) => {
  return [
    {
      name: 'modify',
      label: 'Modifier',
      onClick: onGetOne,
      theme: 'secondary',
      icon: <GetOneIcon color="white" />,
    },
    {
      name: 'delete',
      label: 'Supprimer',
      onClick: onDelOne,
      theme: 'warning',
      icon: <DelOneIcon color="white" />,
    },
  ];
};

export const getCols = ({ props }) => {
  return [
    {
      name: 'clic_name',
      label: 'Nom',
      col: 'clic_name',
      size: '30',
      mob_size: '36',
      title: false,
      sortable: true,
      filterable: { type: 'text' },
    },
  ];
};
