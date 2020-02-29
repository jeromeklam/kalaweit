import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  DelOne as DelOneIcon,
  Donation as DonationIcon,
  FilterClear as FilterClearIcon,
  Sponsorship as SponsorshipIcon,
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
      size: '4',
      mob_size: '',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
    },
    {
      name: 'lastname',
      label: 'Nom',
      col: 'cli_lastname',
      size: '6',
      mob_size: '',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
    },
    {
      name: 'firstname',
      label: 'Prénom',
      col: 'cli_firstname',
      size: '7',
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
    },
    {
      name: 'town',
      label: 'Ville',
      col: 'cli_town',
      size: '7',
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
    },
    {
      name: 'email',
      label: 'Email',
      col: 'cli_email',
      size: '10',
      mob_size: '36',
      sortable: true,
      filterable: { type: 'text' },
      title: true,
    },
    {
      name: 'category',
      label: 'Category',
      col: 'clic_id',
      size: '0',
      mob_size: 'à',
      sortable: false,
      filterable: {
        type: 'select',
        options: clientCategoryAsOptions(props.clientCategory.items),
      },
      title: false,
      hidden: true,
    },
  ];
};
