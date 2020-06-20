import React from 'react';
import { displayMonetary } from 'freeassofront';
import { freeAssoApi } from '../../common';

/**
 * 
 */
export const displayItemPicker = (item) => {
  return (
    <p className="input-picker-line">
      <span className="input-picker-left">{item.cau_name}</span>
      {item.cause_type && item.cause_type.caut_mnt_type === 'ANNUAL' && (
        <span className="input-picker-right">{displayMonetary(item.cau_mnt_left, item.cau_money)}</span>
      )}
    </p>
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