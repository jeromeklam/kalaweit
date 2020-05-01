import { AUTH_SET_REALM } from './constants';
import { saveToLS } from '../../ui';

export function setRealm(realmId) {
  return {
    type: AUTH_SET_REALM,
    realmId: realmId,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_SET_REALM:
      let realm = null;
      if (state.user && state.user.realms && Array.isArray(state.user.realms)) {
        state.user.realms.forEach(item => {
          if (item.id === action.realmId) {
            realm = item;
          }
        });
      }
      saveToLS('realm', action.realmId, 'freeasso-realm');
      return {
        ...state,
        realm: realm,
      };

    default:
      return state;
  }
}
