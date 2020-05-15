import { List, Create, Modify } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'species', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'species/create', name: 'Create', component: Create, auth: 'PRIVATE' },
    { path: 'species/modify/:id', name: 'Modify', component: Modify, auth: 'PRIVATE' },
  ],
};
