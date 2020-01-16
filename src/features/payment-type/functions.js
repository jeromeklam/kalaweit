import { buildModel } from 'freejsonapi';

/**
 * Export all payment types as an array of value=>label
 * 
 * @param {object} object
 * 
 * @return {array}
 */
export function paymentTypeAsOptions(object) {
  let arr   = [];
  let items = buildModel(
    object,
    'FreeAsso_PaymentType',
  );
  items.forEach((item) => {
    arr.push({value: item.id, label: item.ptyp_name});
  });
  arr.sort(function (a, b) {
    if (a.label > b.label) {
      return 1;
    } else {
      if (a.label < b.label) {
        return -1;
      } 
    }
    return 0;
  });
  return arr;
}