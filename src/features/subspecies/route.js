import { List, Create, Modify } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'subspecies', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'subspecies/create', name: 'Create', component: Create, auth: 'PRIVATE' },
    { path: 'subspecies/modify/:id', name: 'Modify', component: Modify, auth: 'PRIVATE' },
  ],
};
