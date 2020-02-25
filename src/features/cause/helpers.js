import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  GetPhoto as GetPhotoIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
  Sponsorship as SponsorshipIcon,
} from '../icons';
import { causeTypeAsOptions } from '../cause-type/functions';
import { siteAsOptions } from '../site/functions';

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

export const getInlineActions = ({ onOpenSponsorship, onOpenPhoto, onGetOne, onDelOne}) => {
  return [
    {
      name: 'sponsorship',
      label: 'Dons réguliers',
      onClick: onOpenSponsorship,
      theme: 'secondary',
      icon: <SponsorshipIcon color="white" />,
    },
    {
      name: 'images',
      label: 'Photos',
      onClick: onOpenPhoto,
      theme: 'secondary',
      icon: <GetPhotoIcon color="white" />,
      role: 'OTHER',
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
      size: '6',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'name',
      label: 'Nom',
      col: 'cau_name',
      size: '6',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'type',
      label: 'Type',
      col: 'cause_type.caut_name',
      size: '12',
      mob_size: '18',
      title: true,
      sortable: true,
    },
    {
      name: 'site',
      label: 'Site',
      col: 'site.site_name',
      size: '10',
      mob_size: '',
      title: true,
      sortable: true,
    },
    {
      name: 'type',
      label: 'Type',
      col: 'cause_type.caut_id',
      size: '0',
      mob_size: '0',
      hidden: true,
      filterable: {
        type: 'select',
        options: causeTypeAsOptions(this.props.causeType.items),
      },
    },
    {
      name: 'site',
      label: 'Site',
      col: 'site.site_id',
      size: '0',
      mob_size: '0',
      hidden: true,
      filterable: {
        type: 'select',
        options: siteAsOptions(this.props.site.items),
      },
    },

  ];
};