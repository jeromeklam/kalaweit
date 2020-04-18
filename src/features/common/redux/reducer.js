import initialState from './initialState';
import { reducer as setCoordsReducer } from './setCoords';
import { reducer as setLocaleReducer } from './setLocale';

const reducers = [
  setCoordsReducer,
  setLocaleReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
