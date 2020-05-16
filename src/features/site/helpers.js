import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
} from '../icons';

export const getGlobalActions = ({ onClearFilters, onCreate, props }) => {
  return [
    {
      name: 'clear',
      label: props.intl.formatMessage({ id: 'app.list.button.clear', defaultMessage: 'Clear' }),
      onClick: onClearFilters,
      theme: 'secondary',
      icon: <FilterClearIcon color="white" />,
      role: 'OTHER',
    },
    {
      name: 'create',
      label: props.intl.formatMessage({ id: 'app.list.button.add', defaultMessage: 'Add new' }),
      onClick: onCreate,
      theme: 'primary',
      icon: <AddOneIcon color="white" />,
      role: 'CREATE',
    },
  ];
};

export const getInlineActions = ({ onGetOne, onDelOne, props }) => {
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
  const { intl } = props;
  return [
    {
      name: 'name',
      label: intl.formatMessage({ id: 'app.features.site.list.col.name', defaultMessage: 'Name' }),
      col: 'site_name',
      size: '8',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
      first: true,
    },
    {
      name: 'address',
      label: intl.formatMessage({ id: 'app.features.site.list.col.address', defaultMessage: 'Address' }),
      col: 'site_address1',
      size: '10',
      mob_size: '36',
      title: false,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'cp',
      label: intl.formatMessage({ id: 'app.features.site.list.col.postalCode', defaultMessage: 'Postal code' }),
      col: 'site_cp',
      size: '2',
      mob_size: '10',
      title: false,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'town',
      label: intl.formatMessage({ id: 'app.features.site.list.col.town', defaultMessage: 'Town' }),
      col: 'site_town',
      size: '10',
      mob_size: '26',
      title: false,
      sortable: true,
      filterable: { type: 'text' },
      last: true,
    },
  ];
};
