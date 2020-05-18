import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { FormattedMessage } from 'react-intl';
import {
  Administrative as AdministrativeIcon,
  Home as HomeIcon,
  About as AboutIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Cause as CauseIcon,
  Person as PersonIcon,
  Donation as DonationIcon,
  System as SystemIcon,
  Dashboard as DashboardIcon,
  Certificate as CertificateIcon,
  Receipt as ReceiptIcon,
} from '../icons';

export const globalMenu = (types) => {
  let causes = [];
  types.forEach((elem) => {
    causes.push({
      icon: '',
      label: elem.label,
      url: '/cause/' + elem.value + '/',
      role: 'NAV',
      public: true,
    });
  });
  return [
    {
      icon: <HomeIcon />,
      label: <FormattedMessage id="app.features.home.app.menu.home" defaultMessage="Home" />,
      url: '/',
      role: 'HOME',
      public: true,
    },
    {
      icon: <LoginIcon />,
      label: <FormattedMessage id="app.features.home.app.menu.signin" defaultMessage="Sign in" />,
      url: '/auth/signin',
      role: 'SIGNIN',
      public: true,
    },
    {
      icon: <LogoutIcon />,
      label: <FormattedMessage id="app.features.home.app.menu.signout" defaultMessage="Sign out" />,
      url: '/auth/signout',
      role: 'SIGNOUT',
      public: false,
    },
    {
      icon: <SocialIcon url="https://facebook.com/KalaweitFrance/" />,
      label: 'Facebook',
      url: null,
      role: 'SOCIAL',
      position: 1,
      public: true,
    },
    {
      icon: <DashboardIcon />,
      label: (
        <FormattedMessage id="app.features.home.app.menu.dashboard" defaultMessage="Dashboard" />
      ),
      url: '/dashboard',
      role: 'NAV',
      position: 1,
      public: false,
    },
    {
      icon: <PersonIcon />,
      label: <FormattedMessage id="app.features.home.app.menu.person" defaultMessage="Members" />,
      url: '/client',
      role: 'NAV',
      position: 2,
      public: false,
    },
    {
      icon: <CauseIcon />,
      label: <FormattedMessage id="app.features.home.app.menu.cause" defaultMessage="Missions" />,
      url: null,
      role: 'MENU',
      position: 3,
      options: causes,
      public: false,
    },
    {
      icon: <DonationIcon />,
      label: (
        <FormattedMessage id="app.features.home.app.menu.donation" defaultMessage="Donations" />
      ),
      url: '/donation',
      role: 'NAV',
      position: 4,
      public: false,
    },
    {
      icon: <ReceiptIcon />,
      label: <FormattedMessage id="app.features.home.app.menu.receipt" defaultMessage="Receipts" />,
      url: '/receipt',
      role: 'NAV',
      position: 5,
      public: false,
    },
    {
      icon: <CertificateIcon />,
      label: (
        <FormattedMessage
          id="app.features.home.app.menu.certificate"
          defaultMessage="Certificates"
        />
      ),
      url: '/certificate',
      role: 'NAV',
      position: 6,
      public: false,
    },
    {
      icon: <AdministrativeIcon />,
      label: (
        <FormattedMessage
          id="app.features.home.app.menu.administrativ"
          defaultMessage="Administrativ"
        />
      ),
      url: null,
      role: 'MENU',
      position: 10,
      public: false,
      options: [
        {
          icon: null,
          label: (
            <FormattedMessage
              id="app.features.home.app.menu.paymentType"
              defaultMessage="Payment types"
            />
          ),
          url: '/payment-type',
          role: 'NAV',
          position: 1,
        },
        {
          icon: null,
          label: (
            <FormattedMessage id="app.features.home.app.menu.causeType" defaultMessage="Missions" />
          ),
          url: '/cause-type',
          role: 'NAV',
          position: 3,
        },
        {
          icon: null,
          label: (
            <FormattedMessage id="app.features.home.app.menu.session" defaultMessage="Sessions" />
          ),
          url: '/session',
          role: 'NAV',
          position: 4,
        },
      ],
    },
    {
      icon: <SystemIcon />,
      label: (
        <FormattedMessage id="app.features.home.app.menu.settings" defaultMessage="Settings" />
      ),
      url: null,
      role: 'MENU',
      position: 20,
      public: false,
      options: [
        {
          icon: null,
          label: (
            <FormattedMessage id="app.features.home.app.menu.site" defaultMessage="Locations" />
          ),
          url: '/site',
          role: 'NAV',
          position: 1,
        },
        {
          icon: null,
          label: (
            <FormattedMessage
              id="app.features.home.app.menu.siteType"
              defaultMessage="Locations types"
            />
          ),
          url: '/site-type',
          role: 'NAV',
          position: 2,
        },
        {
          icon: null,
          label: (
            <FormattedMessage
              id="app.features.home.app.menu.causeMainType"
              defaultMessage="Programs"
            />
          ),
          url: '/cause-main-type',
          role: 'NAV',
          position: 4,
        },
        {
          icon: null,
          label: (
            <FormattedMessage
              id="app.features.home.app.menu.clientCategories"
              defaultMessage="Person categories"
            />
          ),
          url: '/client-category',
          role: 'NAV',
          position: 5,
        },
        {
          icon: null,
          label: (
            <FormattedMessage
              id="app.features.home.app.menu.clientType"
              defaultMessage="Person types"
            />
          ),
          url: '/client-type',
          role: 'NAV',
          position: 6,
        },
        {
          icon: null,
          label: (
            <FormattedMessage id="app.features.home.app.menu.species" defaultMessage="Species" />
          ),
          url: '/species',
          role: 'NAV',
          position: 8,
        },
        {
          icon: null,
          label: (
            <FormattedMessage
              id="app.features.home.app.menu.subspecies"
              defaultMessage="Subspecies"
            />
          ),
          url: '/subspecies',
          role: 'NAV',
          position: 9,
        },
        {
          icon: null,
          label: (
            <FormattedMessage
              id="app.features.home.app.menu.emails"
              defaultMessage="Notifications"
            />
          ),
          url: '/email',
          role: 'NAV',
          position: 20,
        },
        {
          icon: null,
          label: <FormattedMessage id="app.features.home.app.menu.datas" defaultMessage="Datas" />,
          url: '/data',
          role: 'NAV',
          position: 99,
        },
      ],
    },
    {
      icon: <AboutIcon />,
      label: 'Qui sommes nous ?',
      url: '/about',
      role: 'ABOUT',
      public: true,
    },
  ];
};
