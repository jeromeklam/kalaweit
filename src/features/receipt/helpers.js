import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
} from '../icons';
import { getReceiptModes, getReceiptSendMethods } from './';

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

export const getInlineActions = ({onOpenDonations, onOpenSponsorships, onGetOne, onDelOne, state}) => {
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
      label: intl.formatMessage({ id: 'app.features.receipt.list.col.id', defaultMessage: 'Id.' }),
      col: 'id',
      size: {xl: '3', lg: '4'},
      mob_size: '',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
      first: true,
    },
    {
      name: 'rec_gen_ts',
      label: intl.formatMessage({ id: 'app.features.receipt.list.col.created', defaultMessage: 'Gen. on' }),
      col: 'rec_gen_ts',
      size: {xl: '3', lg: '11'},
      mob_size: '36',
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
      title: true,
    },
    {
      name: 'rec_number',
      label: intl.formatMessage({ id: 'app.features.receipt.list.col.number', defaultMessage: 'Number' }),
      col: 'rec_number',
      size: {xl: '3', lg: '6'},
      mob_size: '36',
      title: true,
      sortable: true,
    },
    {
      name: 'rec_mnt',
      label: intl.formatMessage({ id: 'app.features.receipt.list.col.amount', defaultMessage: 'Amount' }),
      col: 'rec_mnt',
      size: {xl: '3', lg: '6'},
      mob_size: '36',
      type: 'monetary',
      title: true,
      filterable: { type: 'monetary' },
      sortable: true,
    },
    {
      name: 'rec_fullname',
      label: intl.formatMessage({ id: 'app.features.receipt.list.col.client', defaultMessage: 'Member' }),
      col: 'rec_fullname',
      size: {xl: '7', lg: '10'},
      mob_size: '36',
      title: true,
      filterable: { type: 'text' },
      sortable: true,
    },
    {
      name: 'rec_email',
      label: intl.formatMessage({ id: 'app.features.receipt.list.col.email', defaultMessage: 'Email' }),
      col: 'rec_email',
      size: {xl: '7', lg: '8'},
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      first: {lg: true},
      title: true,
    },
    {
      name: 'rec_print_ts',
      label: intl.formatMessage({ id: 'app.features.receipt.list.col.printed', defaultMessage: 'Sended on' }),
      col: 'rec_print_ts',
      size: {xl: '3', lg: '11'},
      mob_size: '36',
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
      title: true,
    },
    {
      name: 'rec_send_method',
      label: intl.formatMessage({ id: 'app.features.receipt.list.col.sendMethod', defaultMessage: 'Send method' }),
      col: 'rec_send_method',
      size: {xl: '4', lg: '10'},
      mob_size: '',
      sortable: true,
      type: 'switch',
      values: getReceiptSendMethods(intl),
      filterable: { type: 'select', options: getReceiptSendMethods(intl) },
      title: true,
    },
    {
      name: 'rec_mode',
      label: intl.formatMessage({ id: 'app.features.receipt.list.col.mode', defaultMessage: 'Type' }),
      col: 'rec_mode',
      size: {xl: '3', lg: '10'},
      mob_size: '',
      sortable: false,
      type: 'switch',
      hidden: true,
      values: getReceiptModes(intl),
      filterable: { type: 'select', options: getReceiptModes(intl) },
      title: true,
    },
  ];
};
