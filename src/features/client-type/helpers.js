 import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
} from '../icons';

export const getGlobalActions = ({ onCreate }) => { 
  return [
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
      name: 'clit_name',
      label: 'Nom',
      col: 'clit_name',
      size: '30',
      mob_size: '36',
      title: false,
      sortable: true,
      filterable: { type: 'text' },
    },
  ];
};
