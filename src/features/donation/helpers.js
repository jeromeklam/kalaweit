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
      name: 'date',
      label: 'Date',
      col: 'don_ts',
      size: '5',
      mob_size: '',
      title: true,
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
      first: true,
    },
    {
      name: 'mnt',
      label: 'Montant',
      col: 'don_mnt',
      size: '5',
      mob_size: '',
      sortable: true,
      type: 'monetary',
      filterable: { type: 'text' },
    },
    {
      name: 'status',
      label: 'Status',
      col: 'don_status',
      size: '5',
      mob_size: '',
      sortable: true,
      type: 'switch',
      values: [
        { value: 'WAIT', label: 'Attente' },
        { value: 'OK', label: 'Ok' },
        { value: 'NOK', label: 'Annulé' },
        { value: 'NEXT', label: 'A venir' },
      ],
      filterable: { type: 'text' },
    },
    {
      name: 'lastname',
      label: 'Nom',
      col: 'client.cli_lastname',
      size: '6',
      mob_size: '',
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'firstame',
      label: 'Prénom',
      col: 'client.cli_firstname',
      size: '6',
      mob_size: '',
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'name',
      label: 'Cause',
      col: 'cause.cau_name',
      size: '6',
      mob_size: '',
      sortable: true,
      filterable: { type: 'text' },
      last: true,
    },
  ];
};
