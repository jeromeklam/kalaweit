import { freeAssoApi } from '../../common';
import { jsonApiNormalizer, buildModel, getJsonApi } from 'freejsonapi';

export const updateDonStatus = (donId, newStatus) => {
  const promise = new Promise((resolve, reject) => {
    const doRequestGet = freeAssoApi.get('/v1/asso/donation/' + donId);
      doRequestGet.then(
        (res) => {
          let object = jsonApiNormalizer(res.data);
          let item = buildModel(object, 'FreeAsso_Donation', donId);
          item.don_status = newStatus;
          object = getJsonApi(item, 'FreeAsso_Donation', donId);
          const doRequestPut = freeAssoApi.put('/v1/asso/donation/' + donId, object);
          doRequestPut.then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        },
        (err) => {
          reject(err);
        },
      );
    });

    return promise;
};