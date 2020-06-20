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
  Male as MaleIcon,
  Female as FemaleIcon,
} from '../icons';
import { causeTypeAsOptions } from '../cause-type';
import { siteAsOptions } from '../site/functions';

export const sexSelect = [
  { label: 'Femelle', value: 'F', icon: <FemaleIcon className="col-icon" /> },
  { label: 'Mâle', value: 'M', icon: <MaleIcon className="col-icon" /> },
  { label: 'Indéfini', value: 'OTHER' },
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
      label: props.intl.formatMessage({
        id: 'app.list.button.add',
        defaultMessage: 'Add',
      }),
      onClick: onCreate,
      theme: 'primary',
      icon: <AddOneIcon color="white" />,
      role: 'CREATE',
    },
  ];
};

export const getInlineActions = ({
  props,
  onOpenDonations,
  onOpenSponsorships,
  onOpenPhotos,
  onOpenNews,
  onOpenSponsors,
  onGetOne,
  onDelOne,
  state,
}) => {
  return [
    {
      name: 'donation',
      label: props.intl.formatMessage({
        id: 'app.list.button.donations',
        defaultMessage: 'Donations',
      }),
      onClick: onOpenDonations,
      theme: 'secondary',
      icon: <CauseDonationIcon color="white" />,
      active: state.donations > 0,
    },
    {
      name: 'sponsorship',
      label: props.intl.formatMessage({
        id: 'app.list.button.sponsorships',
        defaultMessage: 'Sponsorships',
      }),
      onClick: onOpenSponsorships,
      theme: 'secondary',
      icon: <SponsorshipIcon color="white" />,
      active: state.sponsorships > 0,
    },
    {
      name: 'images',
      label: props.intl.formatMessage({
        id: 'app.list.button.photos',
        defaultMessage: 'Pictures',
      }),
      onClick: onOpenPhotos,
      theme: 'secondary',
      icon: <GetPhotoIcon color="white" />,
      role: 'OTHER',
      active: state.photos > 0,
    },
    {
      name: 'news',
      label: props.intl.formatMessage({
        id: 'app.list.button.news',
        defaultMessage: 'News',
      }),
      onClick: onOpenNews,
      theme: 'secondary',
      icon: <NewsIcon color="white" />,
      role: 'OTHER',
      active: state.news > 0,
    },
    {
      name: 'sponsors',
      label: props.intl.formatMessage({
        id: 'app.list.button.sponsors',
        defaultMessage: 'Sponsors',
      }),
      onClick: onOpenSponsors,
      theme: 'secondary',
      icon: <SponsorIcon color="white" />,
      role: 'OTHER',
      active: state.sponsors > 0,
    },
    {
      name: 'modify',
      label: props.intl.formatMessage({
        id: 'app.list.button.modify',
        defaultMessage: 'Modify',
      }),
      onClick: onGetOne,
      theme: 'secondary',
      icon: <GetOneIcon color="white" />,
      role: 'MODIFY',
    },
    {
      name: 'delete',
      label: props.intl.formatMessage({
        id: 'app.list.button.delete',
        defaultMessage: 'Delete',
      }),
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
      name: 'photo',
      label: props.intl.formatMessage({
        id: 'app.features.cause.list.col.picture',
        defaultMessage: 'Picture',
      }),
      col: 'default_blob.caum_short_blob',
      size: '3',
      mob_size: '',
      sortable: false,
      title: true,
      first: true,
      type: 'thumbnail',
    },
    {
      name: 'id',
      label: props.intl.formatMessage({
        id: 'app.features.cause.list.col.id',
        defaultMessage: 'Number',
      }),
      col: 'id',
      size: '4',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
      hidden: true,
    },
    {
      name: 'name',
      label: props.intl.formatMessage({
        id: 'app.features.cause.list.col.name',
        defaultMessage: 'Name',
      }),
      col: 'cau_name',
      size: '3',
      mob_size: '',
      title: true,
      sortable: true,
      filterable: { type: 'text' },
    },
    {
      name: 'subspecies',
      label: props.intl.formatMessage({
        id: 'app.features.cause.list.col.subspecies',
        defaultMessage: 'Subspecies',
      }),
      col: 'subspecies.sspe_name',
      size: '8',
      mob_size: '',
      title: true,
      sortable: true,
    },
    {
      name: 'sexe',
      label: props.intl.formatMessage({
        id: 'app.features.cause.list.col.sex',
        defaultMessage: 'Sex',
      }),
      col: 'cau_sex',
      size: '2',
      mob_size: '',
      type: 'switch',
      values: sexSelect,
      sortable: true,
      filterable: false,
    },
    {
      name: 'cau_year',
      label: props.intl.formatMessage({
        id: 'app.features.cause.list.col.cauYear',
        defaultMessage: 'Born in',
      }),
      col: 'cau_year',
      size: '4',
      mob_size: '',
      type: 'numeric',
      title: true,
      sortable: true,
    },
    {
      name: 'cau_mnt',
      label: props.intl.formatMessage({
        id: 'app.features.cause.list.col.mnt',
        defaultMessage: 'Raised',
      }),
      col: 'cau_mnt',
      size: '4',
      mob_size: '',
      type: 'monetary',
      title: true,
      fDisplay: (item, newContent) => {
        if (item.cau_to === '' || item.cau_to === null) {
          return newContent;
        } else {
          return '';
        }
      },
      filterable: { type: 'monetary' },
      sortable: true,
    },
    {
      name: 'cau_mnt_left',
      label: props.intl.formatMessage({
        id: 'app.features.cause.list.col.left',
        defaultMessage: 'Left',
      }),
      col: 'cau_mnt_left',
      size: '4',
      mob_size: '',
      type: 'monetary',
      title: true,
      fDisplay: (item, newContent) => {
        if (item.cau_to === '' || item.cau_to === null) {
          return newContent;
        } else {
          return '';
        }
      },
      filterable: { type: 'monetary' },
      sortable: true,
    },
    {
      name: 'site',
      label: props.intl.formatMessage({
        id: 'app.features.cause.list.col.site',
        defaultMessage: 'Location',
      }),
      col: 'site.site_name',
      size: '3',
      mob_size: '',
      title: true,
      sortable: true,
    },
    {
      name: 'cau_to',
      label: props.intl.formatMessage({
        id: 'app.features.cause.list.col.end',
        defaultMessage: 'End',
      }),
      col: 'cau_to',
      size: '0',
      mob_size: '0',
      hidden: true,
      filterable: { type: 'date' },
    },
    {
      name: 'site',
      label: props.intl.formatMessage({
        id: 'app.features.cause.list.col.site',
        defaultMessage: 'Location',
      }),
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
