import { buildModel } from 'freejsonapi';

/**
 * Export all langs as an array of value=>label
 * 
 * @param {object} object
 * 
 * @return {array}
 */
export function langAsOptions(object) {
  let arr   = [];
  let items = buildModel(
    object,
    'FreeFW_Lang',
  );
  items.forEach((item) => {
    arr.push({value: item.id, label: item.lang_name});
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