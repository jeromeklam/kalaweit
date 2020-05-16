import { dataTypes } from './';
import React from 'react';
import { 
  AddOne as AddOneIcon, 
  GetOne as GetOneIcon, 
  DelOne as DelOneIcon,
} from '../icons';

export const getGlobalActions = ({ props, onCreate }) => {
  return [
    {
      name: 'create',
      label: props.intl.formatMessage({ id: 'app.list.button.add', defaultMessage: 'Add' }),
      onClick: onCreate,
      theme: 'primary',
      disabled: true,
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
      disabled: true,
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
      label: props.intl.formatMessage({ id: 'app.features.data.list.col.name', defaultMessage: 'Name' }),
      size: '20',
      col: 'data_name',
      title: true,
      sortable: true,
      first: true,
      filterable: { type: 'text' },
    },
    {
      name: 'type',
      label: props.intl.formatMessage({ id: 'app.features.data.list.col.type', defaultMessage: 'Type' }),
      size: '10',
      col: 'data_type',
      title: true,
      last: true,
      type: 'switch',
      values: dataTypes(),
    },
  ];
};
