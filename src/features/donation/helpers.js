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

export const getGlobalActions = ({ props, onClearFilters, onCreate }) => {
  return [
    {
      name: 'clear',
      label: props.intl.formatMessage({
        id: 'app.list.button.clear',
        defaultMessage: 'Clear filters',
      }),
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

export const getInlineActions = ({ props, onGetOne, onDelOne, onPayOn, onPayOff }) => {
  return [
    {
      name: 'status',
      label: props.intl.formatMessage({ id: 'app.list.button.paid', defaultMessage: 'Paid' }),
      onClick: onPayOn,
      theme: 'secondary',
      icon: <PaymentOnIcon color="white" />,
      role: 'OTHER',
      fDisplay: item => {
        if (item.don_status === 'NOK' || item.don_status === 'WAIT') {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      name: 'status',
      label: props.intl.formatMessage({ id: 'app.list.button.unpaid', defaultMessage: 'Unpaid' }),
      onClick: onPayOff,
      theme: 'secondary',
      icon: <PaymentOffIcon color="white" />,
      role: 'OTHER',
      fDisplay: item => {
        if (item.don_status === 'OK' || item.don_status === 'WAIT') {
          return true;
        } else {
          return false;
        }
      },
    },
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
      name: 'id',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.id',
        defaultMessage: 'Id.',
      }),
      col: 'id',
      size: '3',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
      hidden: true,
    },
    {
      name: 'lastname',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.realTs',
        defaultMessage: 'Lastname',
      }),
      col: 'client.cli_lastname',
      size: '5',
      mob_size: '',
      sortable: true,
      first: true,
      filterable: { type: 'text' },
    },
    {
      name: 'firstame',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.realTs',
        defaultMessage: 'Firstname',
      }),
      col: 'client.cli_firstname',
      size: '5',
      mob_size: '',
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'date',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.realTs',
        defaultMessage: 'Done on',
      }),
      col: 'don_real_ts',
      size: '3',
      mob_size: '',
      title: true,
      sortable: true,
      type: 'date',
      filterable: { type: 'date' },
    },
    {
      name: 'mnt',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.mnt',
        defaultMessage: 'Amount',
      }),
      col: 'don_mnt',
      size: '3',
      mob_size: '',
      sortable: true,
      type: 'monetary',
      filterable: { type: 'text' },
    },
    {
      name: 'status',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.status',
        defaultMessage: 'Status',
      }),
      col: 'don_status',
      size: '3',
      mob_size: '',
      sortable: true,
      type: 'switch',
      values: statusValues,
      filterable: { type: 'text' },
    },
    {
      name: 'type',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.type',
        defaultMessage: 'Type',
      }),
      col: 'payment_type.ptyp_name',
      size: '4',
      mob_size: '',
      sortable: true,
      type: 'text',
      filterable: { type: 'text' },
    },
    {
      name: 'name',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.cause',
        defaultMessage: 'Mission',
      }),
      col: 'cause.cau_name',
      size: '6',
      mob_size: '',
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'note',
      label: props.intl.formatMessage({
        id: 'app.features.donation.list.col.comments',
        defaultMessage: 'Comments',
      }),
      col: 'don_comment',
      size: '7',
      mob_size: '',
      sortable: true,
      fDisplay: item => {
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
