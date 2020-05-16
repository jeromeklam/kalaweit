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

export const getGlobalActions = ({ props, onClearFilters, onCreate }) => {
  return [
    {
      name: 'clear',
      label: props.intl.formatMessage({ id: 'app.list.button.clear', defaultMessage: 'Clear filters' }),
      onClick: onClearFilters,
      theme: 'secondary',
      icon: <FilterClearIcon color="white" />,
      role: 'OTHER',
    },
    {
      name: 'create',
      label: props.intl.formatMessage({ id: 'app.list.button.add', defaultMessage: 'Add' }),
      onClick: onCreate,
      theme: 'primary',
      icon: <AddOneIcon color="white" />,
      role: 'CREATE',
    },
  ];
};

export const getInlineActions = ({ props, onGetOne, onDelOne }) => {
  return [
    {
      name: 'modify',
      label: props.intl.formatMessage({ id: 'app.list.button.modify', defaultMessage: 'Modify' }),
      onClick: onGetOne,
      theme: 'secondary',
      icon: <GetOneIcon color="white" />,
      role: 'MODIFY',
    },
    {
      name: 'delete',
      label: props.intl.formatMessage({ id: 'app.list.button.delete', defaultMessage: 'Delete' }),
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
      label: props.intl.formatMessage({ id: 'app.features.causeType.list.col.name', defaultMessage: 'Name' }),
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
      label: props.intl.formatMessage({ id: 'app.features.causeType.list.col.mainType', defaultMessage: 'Program' }),
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
      label: props.intl.formatMessage({ id: 'app.features.causeType.list.col.money', defaultMessage: 'Money' }),
      col: 'caut_money',
      size: '3',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'max',
      label: props.intl.formatMessage({ id: 'app.features.causeType.list.col.maxMnt', defaultMessage: 'Maximum' }),
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
      label: props.intl.formatMessage({ id: 'app.features.causeType.list.col.mntType', defaultMessage: 'Totalization' }),
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
      label: props.intl.formatMessage({ id: 'app.features.causeType.list.col.receipt', defaultMessage: 'Receipt' }),
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
      label: props.intl.formatMessage({ id: 'app.features.causeType.list.col.certificate', defaultMessage: 'Certificate' }),
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
