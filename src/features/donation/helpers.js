import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
} from '../icons';

export const statusValues = [
  { value: 'WAIT', label: 'Attente' },
  { value: 'OK', label: 'Validé' },
  { value: 'NOK', label: 'Annulé' },
  { value: 'NEXT', label: 'A venir' },
];

export const getGlobalActions = ({ onClearFilters, onCreate }) => {
  return [
    {
      name: 'clear',
      label: 'Effacer',
      onClick: onClearFilters,
      theme: 'secondary',
      icon: <FilterClearIcon color="white" />,
      role: 'OTHER',
    },
    {
      name: 'create',
      label: 'Ajouter',
      onClick: onCreate,
      theme: 'primary',
      icon: <AddOneIcon color="white" />,
      role: 'CREATE',
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
      role: 'MODIFY',
    },
    {
      name: 'delete',
      label: 'Supprimer',
      onClick: onDelOne,
      theme: 'warning',
      icon: <DelOneIcon color="white" />,
      role: 'DELETE',
    },
  ];
};

export const getCols = ({ props }) => {
  return [
    {
      name: 'id',
      label: 'Identifiant',
      col: 'id',
      size: '4',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
      first: true,
    },
    {
      name: 'date',
      label: 'Date',
      col: 'don_ts',
      size: '4',
      mob_size: '',
      title: true,
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
    },
    {
      name: 'mnt',
      label: 'Montant',
      col: 'don_mnt',
      size: '4',
      mob_size: '',
      sortable: true,
      type: 'monetary',
      filterable: { type: 'text' },
    },
    {
      name: 'status',
      label: 'Status',
      col: 'don_status',
      size: '4',
      mob_size: '',
      sortable: true,
      type: 'switch',
      values: statusValues,
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
