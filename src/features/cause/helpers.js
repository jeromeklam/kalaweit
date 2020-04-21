import React from 'react';
import {
  AddOne as AddOneIcon,
  GetOne as GetOneIcon,
  GetPhoto as GetPhotoIcon,
  DelOne as DelOneIcon,
  FilterClear as FilterClearIcon,
  Sponsorship as SponsorshipIcon,
  Donation as CauseDonationIcon,
  News as NewsIcon,
  Sponsor as SponsorIcon,
} from '../icons';
import { causeTypeAsOptions } from '../cause-type';
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

export const getInlineActions = ({ onOpenDonations,  onOpenSponsorships, onOpenPhotos, onOpenNews, onOpenSponsors, onGetOne, onDelOne, state}) => {
  return [
    {
      name: 'donation',
      label: 'Dons',
      onClick: onOpenDonations,
      theme: 'secondary',
      icon: <CauseDonationIcon color="white" />,
      active: state.donations > 0,
    },
    {
      name: 'sponsorship',
      label: 'Dons ou parrainages réguliers',
      onClick: onOpenSponsorships,
      theme: 'secondary',
      icon: <SponsorshipIcon color="white" />,
      active: state.sponsorships > 0,
    },
    {
      name: 'images',
      label: 'Photos',
      onClick: onOpenPhotos,
      theme: 'secondary',
      icon: <GetPhotoIcon color="white" />,
      role: 'OTHER',
      active: state.photos > 0,
    },
    {
      name: 'news',
      label: 'Journal',
      onClick: onOpenNews,
      theme: 'secondary',
      icon: <NewsIcon color="white" />,
      role: 'OTHER',
      active: state.news > 0,
    },
    {
      name: 'sponsors',
      label: 'Parrains',
      onClick: onOpenSponsors,
      theme: 'secondary',
      icon: <SponsorIcon color="white" />,
      role: 'OTHER',
      active: state.sponsors > 0,
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

const endCause = (item) => {
  if (item.cau_to !== null && item.cau_to !== '') {
    return 'text-line-through';
  }
  return '';
}


export const getCols = ({ props }) => {
  return [
    {
      name: 'id',
      label: 'Identifiant',
      col: 'id',
      size: '4',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
      first: true,
      fClass: endCause,
    },
    {
      name: 'name',
      label: 'Nom',
      col: 'cau_name',
      size: '5',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
      fClass: endCause,
    },
    {
      name: 'cau_year',
      label: 'Année naissance',
      col: 'cau_year',
      size: '4',
      mob_size: '',
      type: 'numeric',
      title: true,
      sortable: true,
    },
    {
      name: 'type',
      label: 'Type',
      col: 'cause_type.caut_name',
      size: '8',
      mob_size: '18',
      title: true,
      sortable: true,
    },
    {
      name: 'cau_mnt',
      label: 'Récolté',
      col: 'cau_mnt',
      size: '4',
      mob_size: '',
      type: 'monetary',
      title: true,
      fDisplay: (item, newContent) => { if (item.cau_to === '' || item.cau_to === null) { return newContent; } else { return ''; } },
      filterable: { type: 'monetary' },
      sortable: true,
    },
    {
      name: 'cau_mnt_left',
      label: 'Restant',
      col: 'cau_mnt_left',
      size: '4',
      mob_size: '',
      type: 'monetary',
      title: true,
      fDisplay: (item, newContent) => { if (item.cau_to === '' || item.cau_to === null) { return newContent; } else { return ''; } },
      filterable: { type: 'monetary' },
      sortable: true,
    },
    {
      name: 'site',
      label: 'Site',
      col: 'site.site_name',
      size: '6',
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
        options: causeTypeAsOptions(props.causeType.items),
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
        options: siteAsOptions(props.site.items),
      },
      last: true,
    },

  ];
};