import React from 'react';
import { displayMonetary } from 'freeassofront';
import { freeAssoApi } from '../../common';

/**
 * 
 */
export const displayItemPicker = (item) => {
  return (
    <div className="w-100">
      <span>{item.cau_name}</span>
      {item.cause_type && item.cause_type.caut_mnt_type === 'ANNUAL' && (
        <span className="float-right ml-2">{displayMonetary(item.cau_mnt_left, item.cau_money)}</span>
      )}
    </div>
  )
};

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