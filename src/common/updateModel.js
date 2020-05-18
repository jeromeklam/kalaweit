import { CAUSE_MAIN_TYPE_UPDATE_ONE_UPDATE } from '../features/cause-main-type/redux/constants';
import { CAUSE_TYPE_UPDATE_ONE_UPDATE } from '../features/cause-type/redux/constants';
import { CAUSE_UPDATE_ONE_UPDATE } from '../features/cause/redux/constants';
import { CLIENT_CATEGORY_UPDATE_ONE_UPDATE } from '../features/client-category/redux/constants';
import { CLIENT_TYPE_UPDATE_ONE_UPDATE } from '../features/client-type/redux/constants';
import { CLIENT_UPDATE_ONE_UPDATE } from '../features/client/redux/constants';
import { DATA_UPDATE_ONE_UPDATE } from '../features/data/redux/constants';
import { DONATION_UPDATE_ONE_UPDATE } from '../features/donation/redux/constants';
import { EMAIL_UPDATE_ONE_UPDATE } from '../features/email/redux/constants';
import { PAYMENT_TYPE_UPDATE_ONE_UPDATE } from '../features/payment-type/redux/constants';
import { SITE_UPDATE_ONE_UPDATE } from '../features/site/redux/constants';
import { SITE_TYPE_UPDATE_ONE_UPDATE } from '../features/site-type/redux/constants';
import { SPECIES_UPDATE_ONE_UPDATE } from '../features/species/redux/constants';
import { SPONSORSHIP_UPDATE_ONE_UPDATE } from '../features/sponsorship/redux/constants';
import { SUBSPECIES_UPDATE_ONE_UPDATE } from '../features/subspecies/redux/constants';

export function propagateModel(type, model) {
  return dispatch => {
    switch (type) {
      case 'FreeAsso_CauseMainType':
        dispatch({
          type: CAUSE_MAIN_TYPE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_CauseType':
        dispatch({
          type: CAUSE_TYPE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Cause':
        dispatch({
          type: CAUSE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_ClientCategory':
        dispatch({
          type: CLIENT_CATEGORY_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_ClientType':
        dispatch({
          type: CLIENT_TYPE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Client':
        dispatch({
          type: CLIENT_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Data':
        dispatch({
          type: DATA_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Donation':
        dispatch({
          type: DONATION_UPDATE_ONE_UPDATE,
          data: model,
        });
        dispatch({
          type: CAUSE_UPDATE_ONE_UPDATE,
          data: model,
        });
        dispatch({
          type: CLIENT_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeFW_Email':
        dispatch({
          type: EMAIL_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_PaymentType':
        dispatch({
          type: PAYMENT_TYPE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Site':
        dispatch({
          type: SITE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_SiteType':
        dispatch({
          type: SITE_TYPE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Species':
        dispatch({
          type: SPECIES_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Sponsorship':
        dispatch({
          type: SPONSORSHIP_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Subspecies':
        dispatch({
          type: SUBSPECIES_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      default:
        break;
    }
  };
}
