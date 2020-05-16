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
      name: 'spe_name',
      label: props.intl.formatMessage({ id: 'app.features.species.list.col.name', defaultMessage: 'Name' }),
      col: 'spe_name',
      size: '12',
      mob_size: '36',
      title: true,
      first: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'spe_scientific',
      label: props.intl.formatMessage({ id: 'app.features.species.list.col.scientific', defaultMessage: 'Scientific' }),
      col: 'spe_scientific',
      size: '12',
      mob_size: '36',
      title: true,
      last: true,
      sortable: true,
      filterable: { type: 'text' },
    },
  ];
};
