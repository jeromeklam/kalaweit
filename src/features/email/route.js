import { List, Modify, Create } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'email', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'email/create', name: 'Create', component: Create, auth: 'PRIVATE' },
    { path: 'email/modify/:id', name: 'Modify', component: Modify, auth: 'PRIVATE' },
  ],
};
