import { List } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'certificate', name: 'List', component: List, auth: 'PRIVATE' },
  ],
};
