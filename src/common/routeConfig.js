import { App } from '../features/home';
import { PageNotFound } from '../features/ui';
import _ from 'lodash';
import homeRoute from '../features/home/route';
import commonRoute from '../features/common/route';
import siteRoute from '../features/site/route';
import authRoute from '../features/auth/route';
import iconsRoute from '../features/icons/route';
import causeRoute from '../features/cause/route';
import dataRoute from '../features/data/route';
import aboutRoute from '../features/about/route';
import siteTypeRoute from '../features/site-type/route';
import causeTypeRoute from '../features/cause-type/route';
import configRoute from '../features/config/route';
import emailRoute from '../features/email/route';
import langRoute from '../features/lang/route';
import clientRoute from '../features/client/route';
import clientTypeRoute from '../features/client-type/route';
import clientCategoryRoute from '../features/client-category/route';
import mapRoute from '../features/map/route';
import dashboardRoute from '../features/dashboard/route';
import countryRoute from '../features/country/route';
import uiRoute from '../features/ui/route';
import donationRoute from '../features/donation/route';
import causeMainTypeRoute from '../features/cause-main-type/route';
import sponsorshipRoute from '../features/sponsorship/route';
import paymentTypeRoute from '../features/payment-type/route';
import donationOriginRoute from '../features/donation-origin/route';
import sessionRoute from '../features/session/route';
import receiptRoute from '../features/receipt/route';
import certificateRoute from '../features/certificate/route';
import moneyRoute from '../features/money/route';

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.
const childRoutes = [
  homeRoute,
  commonRoute,
  siteRoute,
  authRoute,
  iconsRoute,
  causeRoute,
  dataRoute,
  aboutRoute,
  siteTypeRoute,
  causeTypeRoute,
  configRoute,
  emailRoute,
  langRoute,
  clientRoute,
  clientTypeRoute,
  clientCategoryRoute,
  mapRoute,
  dashboardRoute,
  countryRoute,
  uiRoute,
  donationRoute,
  causeMainTypeRoute,
  sponsorshipRoute,
  paymentTypeRoute,
  donationOriginRoute,
  sessionRoute,
  receiptRoute,
  certificateRoute,
  moneyRoute,
];

const routes = [{
  path: '/',
  component: App,
  childRoutes: [
    ...childRoutes,
    { path: '*', name: 'Page not found', component: PageNotFound },
  ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
}];

// Handle isIndex property of route config:
//  Dupicate it and put it as the first route rule.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = _.find(route.childRoutes, (child => child.isIndex));
  if (indexRoute) {
    const first = { ...indexRoute };
    first.path = '';
    first.exact = true;
    first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first);
  }
  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);
export default routes;
