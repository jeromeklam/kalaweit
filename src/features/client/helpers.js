import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
  Sponsorship as SponsorshipIcon,
  Donation as DonationIcon,
} from '../icons';
import { clientCategoryAsOptions } from '../client-category';

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
      name: 'donation',
      label: 'Dons',
      onClick: onOpenDonations,
      theme: 'secondary',
      icon: <DonationIcon color="white" />,
      active: state.donations > 0,
    },
    {
      name: 'sponsorship',
      label: 'Dons et parrainages réguliers',
      onClick: onOpenSponsorships,
      theme: 'secondary',
      icon: <SponsorshipIcon color="white" />,
      active: state.sponsorships > 0,
    },
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
      name: 'lastname',
      label: 'Nom',
      col: 'cli_lastname',
      size: {xl: '4', lg: '10'},
      mob_size: '',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
    },
    {
      name: 'firstname',
      label: 'Prénom',
      col: 'cli_firstname',
      size: {xl: '5', lg: '11'},
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
    },
    {
      name: 'category',
      label: 'Catégorie',
      col: 'client_category.clic_name',
      size: {xl: '4', lg: '10'},
      mob_size: '36',
      title: true,
      sortable: true,
    },
    {
      name: 'town',
      label: 'Ville',
      col: 'cli_town',
      size: {xl: '5', lg: '8'},
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      first: {lg: true},
      title: true,
    },
    {
      name: 'email',
      label: 'Email',
      col: 'cli_email',
      size: {xl: '8', lg: '15'},
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
    },
    {
      name: 'last_donation',
      label: 'Dernier don',
      col: 'last_donation.don_ts',
      size: {xl: '5', lg: '10'},
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
      type: 'date',
      last: true,
    },
    {
      name: 'category',
      label: 'Catégorie',
      col: 'client_category.clic_id',
      size: '0',
      mob_size: '0',
      sortable: false,
      filterable: {
        type: 'select',
        options: clientCategoryAsOptions(props.clientCategory.items),
      },
      title: true,
      hidden: true,
      last: true,
    },
  ];
};
