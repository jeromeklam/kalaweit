import { freeAssoApi } from '../../common';
import { jsonApiNormalizer, normalizedObjectModeler, getJsonApi } from 'freejsonapi';

export const calculateDonationEndTs = item => {
  let endTs = item.don_end_ts;
  if (item.cause.id > 0 && item.cause.cause_type) {
    let cautDuration = item.cause.cause_type.caut_once_duration;
    try {
      let myDate = new Date(item.don_real_ts);
      switch (cautDuration) {
        case '1Y': {
          myDate.setFullYear(myDate.getFullYear() + 1);
          endTs = myDate.toISOString();
          break;
        }
        case '1M': {
          myDate.setMonth(myDate.getMonth() + 1);
          endTs = myDate.toISOString();
          break;
        }
        default: {
          endTs = null;
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  return endTs;
};

/**
 *
 */
export const updateDonStatus = (donId, newStatus) => {
  const promise = new Promise((resolve, reject) => {
    const doRequestGet = freeAssoApi.get('/v1/asso/donation/' + donId);
    doRequestGet.then(
      res => {
        let object = jsonApiNormalizer(res.data);
        let item = normalizedObjectModeler(object, 'FreeAsso_Donation', donId);
        item.don_status = newStatus;
        object = getJsonApi(item, 'FreeAsso_Donation', donId);
        const doRequestPut = freeAssoApi.put('/v1/asso/donation/' + donId, object);
        doRequestPut.then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          },
        );
      },
      err => {
        reject(err);
      },
    );
  });

  return promise;
};
