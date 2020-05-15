import React from 'react';
import { displayMonetary } from 'freeassofront';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
  ColCheck as ColCheckIcon,
  Minus as MinusIcon,
} from '../icons';
import { causeTypeMntType } from './';

export const validSelect = [
  { label: 'Actif', value: true, icon: <ColCheckIcon className="col-icon" /> },
  { label: 'Inactif', value: false, icon: <MinusIcon className="col-icon" /> },
];

const mntCol = (item) => {
  if (item.caut_family !== 'ANIMAL') {
    return '';
  }
  return displayMonetary(item.caut_max_mnt);
}

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
      name: 'name',
      label: 'Nom',
      col: 'caut_name',
      size: '10',
      mob_size: '',
      title: true,
      sortable: true,
      first: true,
      filterable: { type: 'text' },
    },
    {
      name: 'camt_name',
      label: 'Programme',
      col: 'cause_main_type.camt_name',
      size: '6',
      mob_size: '',
      title: true,
      sortable: true,
      first: true,
      filterable: { type: 'text' },
    },
    {
      name: 'money',
      label: 'Monnaie',
      col: 'caut_money',
      size: '3',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'max',
      label: 'Maximum',
      col: 'caut_max_mnt',
      size: '4',
      mob_size: '',
      title: true,
      sortable: true,
      type: 'monetary',
      fDisplay: mntCol,
      filterable: { type: 'text' },
    },
    {
      name: 'mnt_type',
      label: 'Totalisation',
      col: 'caut_mnt_type',
      size: '5',
      mob_size: '',
      title: true,
      sortable: true,
      type: 'switch',
      values: causeTypeMntType,
      filterable: { type: 'text' },
    },
    {
      name: 'caut_receipt',
      label: 'Reçu',
      col: 'caut_receipt',
      size: '3',
      mob_size: '',
      title: true,
      sortable: true,
      type: 'bool',
      values: validSelect,
      filterable: { type: 'bool' },
    },
    {
      name: 'caut_cert',
      label: 'Certificat',
      col: 'caut_certificat',
      size: '3',
      mob_size: '',
      title: true,
      sortable: true,
      type: 'bool',
      values: validSelect,
      last: true,
      filterable: { type: 'bool' },
    },
  ];
};
