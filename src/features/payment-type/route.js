import { List, Create, Modify } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'payment-type', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'payment-type/create', name: 'Create', component: Create, auth: 'PRIVATE' },
    { path: 'payment-type/modify/:ptypId', name: 'Modify', component: Modify, auth: 'PRIVATE' },
  ],
};
