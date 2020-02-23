import { List, Modify, Create } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'donation', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'donation/create', name: 'Create', component: Create, auth: 'PRIVATE' },
    { path: 'donation/modify/:donationId', name: 'Modify', component: Modify, auth: 'PRIVATE' },
  ],
};