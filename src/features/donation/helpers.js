import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  PaymentOn as PaymentOnIcon,
  PaymentOff as PaymentOffIcon,
  FilterClear as FilterClearIcon,
  Note as NoteIcon,
} from '../icons';

export const statusValues = [
  { value: 'WAIT', label: 'En attente' },
  { value: 'OK', label: 'Payé' },
  { value: 'NOK', label: 'Impayé' },
  //{ value: 'NEXT', label: 'A venir' },
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

export const getInlineActions = ({ onGetOne, onDelOne, onPayOn, onPayOff }) => {
  return [
    {
      name: 'status',
      label: 'Payé',
      onClick: onPayOn,
      theme: 'secondary',
      icon: <PaymentOnIcon color="white" />,
      role: 'MODIFY',
      fDisplay: (item) => { if (item.don_status === 'NOK' || item.don_status === 'WAIT') { return true; } else { return false; } },
    },
    {
      name: 'status',
      label: 'Impayé',
      onClick: onPayOff,
      theme: 'secondary',
      icon: <PaymentOffIcon color="white" />,
      role: 'MODIFY',
      fDisplay: (item) => { if (item.don_status === 'OK' || item.don_status === 'WAIT') { return true; } else { return false; } },
    },
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
      size: '3',
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
      size: '3',
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
      label: 'Statut',
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
    },
    {
      name: 'note',
      label: '',
      col: 'don_comment',
      size: '2',
      mob_size: '',
      sortable: true,
      fDisplay: (item) => { 
        if (item.don_comment !== '' && item.don_comment !== null) { 
          return <NoteIcon className="col-icon" />; 
        } else { 
          return ''; 
        } 
      },
      last: true,
    },
  ];
};
