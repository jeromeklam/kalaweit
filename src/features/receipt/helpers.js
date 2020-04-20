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
  return [
    {
      name: 'id',
      label: 'Identifiant',
      col: 'id',
      size: {xl: '3', lg: '5'},
      mob_size: '',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
      first: true,
    },
    {
      name: 'rec_mode',
      label: 'Type',
      col: 'rec_mode',
      size: {xl: '4', lg: '10'},
      mob_size: '',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
    },
    {
      name: 'rec_ts',
      label: 'Généré le',
      col: 'rec_ts',
      size: {xl: '5', lg: '11'},
      mob_size: '36',
      sortable: true,
      type: 'date',
      filterable: { type: 'text' },
      title: true,
    },
    {
      name: 'rec_fullname',
      label: 'Nom',
      col: 'rec_fullname',
      size: {xl: '4', lg: '10'},
      mob_size: '36',
      title: true,
      sortable: true,
    },
    {
      name: 'rec_email',
      label: 'Email',
      col: 'rec_email',
      size: {xl: '5', lg: '8'},
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      first: {lg: true},
      title: true,
    }
  ];
};
