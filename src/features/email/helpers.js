 import React from 'react';
import { 
  AddOne as AddOneIcon, 
  GetOne as GetOneIcon, 
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
} from '../icons';

export const emailCodes = [
  {label: 'Mot de passe oublié', value: 'ASK_PASSWORD'},
];

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
      name: 'subject',
      label: props.intl.formatMessage({ id: 'app.features.email.list.col.name', defaultMessage: 'Name' }),
      col: 'email_subject',
      size: '20',
      mob_size: '',
      title: true,
      sortable: true,
      first: true,
      filterable: { type: 'text' },
    },
    {
      name: 'code',
      label: props.intl.formatMessage({ id: 'app.features.email.list.col.code', defaultMessage: 'For' }),
      col: 'email_code',
      size: '8',
      mob_size: '',
      sortable: true,
      type: 'switch',
      values: emailCodes,
      filterable: {
        type: 'select',
        options: emailCodes,
      },
    },
    {
      name: 'lang',
      label: props.intl.formatMessage({ id: 'app.features.email.list.col.lang', defaultMessage: 'Lang' }),
      col: 'lang.lang_name',
      size: '8',
      mob_size: '',
      sortable: true,
      last: true,
      type: 'text',
      filterable: {
        type: 'text',
      },
    },
  ];
};
