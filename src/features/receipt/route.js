import { List } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'receipt', name: 'List', component: List, auth: 'PRIVATE' },
  ],
};