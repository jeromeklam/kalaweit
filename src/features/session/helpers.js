import React from 'react';
import { AddOne as AddOneIcon, GetOne as GetOneIcon, DelOne as DelOneIcon } from '../icons';

export const sessionStatus = [
  { value: 'OPEN', label: 'Ouverte' },
  { value: 'CLOSED', label: 'Fermée' },
  { value: 'VALIDATION', label: 'En validation' },
];

export const sessionType = [
  { value: 'STANDARD', label: 'Standard' },
  { value: 'CORRECTION', label: 'Corrective' },
];

export const getGlobalActions = ({ props, onCreate }) => {
  return [
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
      name: 'sess_name',
      label: props.intl.formatMessage({
        id: 'app.features.session.list.col.name',
        defaultMessage: 'Name',
      }),
      col: 'sess_name',
      size: '10',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
      first: true,
    },
    {
      name: 'sess_exercice',
      label: props.intl.formatMessage({
        id: 'app.features.session.list.col.exercice',
        defaultMessage: 'Exercise',
      }),
      col: 'sess_exercice',
      size: '4',
      mob_size: '',
      type: 'numeric',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'sess_status',
      label: props.intl.formatMessage({
        id: 'app.features.session.list.col.status',
        defaultMessage: 'Status',
      }),
      col: 'sess_status',
      size: '10',
      mob_size: '',
      title: true,
      sortable: true,
      type: 'switch',
      values: sessionStatus,
      filterable: {
        type: 'select',
        options: sessionStatus,
      },
    },
  ];
};
