import { freeAssoApi } from '../../common';

/**
 *
 */
export const downloadCauseMediaBlob = caum_id => {
  const promise = new Promise((resolve, reject) => {
    const doRequest = freeAssoApi.get('/v1/asso/cause_media_blob/download/' + caum_id, {
      responseType: 'arraybuffer',
    });
    doRequest.then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      },
    );
  });
  return promise;
};