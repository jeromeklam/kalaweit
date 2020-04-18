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
      name: 'subject',
      label: 'Sujet',
      col: 'email_subject',
      size: '20',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'code',
      label: 'Code',
      col: 'email_code',
      size: '10',
      mob_size: '',
      sortable: true,
      filterable: { type: true },
    },
  ];
};
