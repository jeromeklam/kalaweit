import { List, Create, Modify } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'session', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'session/create', name: 'Create', component: Create, auth: 'PRIVATE' },
    { path: 'session/modify/:id', name: 'Modify', component: Modify, auth: 'PRIVATE' },
  ],
};
