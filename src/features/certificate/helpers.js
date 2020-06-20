import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
} from '../icons';

export const getGlobalActions = ({ onClearFilters, onCreate}) => {
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

export const getInlineActions = ({onGetOne, onDelOne, state}) => {
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
  const intl = props.intl;
  return [
    {
      name: 'id',
      label: intl.formatMessage({ id: 'app.features.certificate.list.col.id', defaultMessage: 'Id.' }),
      col: 'id',
      size: {xl: '3', lg: '4'},
      mob_size: '',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
      first: true,
    },
    {
      name: 'cert_gen_ts',
      label: intl.formatMessage({ id: 'app.features.certificate.list.col.created', defaultMessage: 'Gen. on' }),
      col: 'rec_gen_ts',
      size: {xl: '3', lg: '11'},
      mob_size: '36',
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
      title: true,
    },
    {
      name: 'cert_input_mnt',
      label: intl.formatMessage({ id: 'app.features.certificate.list.col.amount', defaultMessage: 'Amount' }),
      col: 'cert_input_mnt',
      size: {xl: '3', lg: '6'},
      mob_size: '36',
      type: 'monetary',
      title: true,
      filterable: { type: 'monetary' },
      sortable: true,
    },
    {
      name: 'cert_fullname',
      label: intl.formatMessage({ id: 'app.features.certificate.list.col.client', defaultMessage: 'Member' }),
      col: 'cert_fullname',
      size: {xl: '7', lg: '10'},
      mob_size: '36',
      title: true,
      filterable: { type: 'text' },
      sortable: true,
    },
    {
      name: 'cert_email',
      label: intl.formatMessage({ id: 'app.features.certificate.list.col.email', defaultMessage: 'Email' }),
      col: 'cert_email',
      size: {xl: '7', lg: '8'},
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      first: {lg: true},
      title: true,
    },
    {
      name: 'cert_print_ts',
      label: intl.formatMessage({ id: 'app.features.certificate.list.col.printed', defaultMessage: 'Sended on' }),
      col: 'cert_print_ts',
      size: {xl: '3', lg: '11'},
      mob_size: '36',
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
      title: true,
    },
  ];
};
