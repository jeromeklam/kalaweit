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
      let inputMoney = state.inputMoney;
      let displayMoney = state.displayMoney;
      if (state.user && state.user.realms && Array.isArray(state.user.realms)) {
        state.user.realms.forEach(item => {
          if (item.id === action.realmId) {
            realm = item;
            inputMoney = realm.grp_money_input;
            displayMoney = realm.grp_money_code;
          }
        });
      }
      saveToLS('realm', action.realmId, 'freeasso-realm');
      return {
        ...state,
        realm: realm,
        inputMoney: inputMoney,
        displayMoney: displayMoney,
      };

    default:
      return state;
  }
}
