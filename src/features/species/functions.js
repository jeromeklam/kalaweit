import { buildModel } from 'freejsonapi';

/**
 * Export all species as an array of value=>label
 * 
 * @param {object} object
 * 
 * @return {array}
 */
export function speciesAsOptions(object) {
  let arr   = [];
  if (object) {
    let items = buildModel(
      object,
      'FreeAsso_Species',
    );
    if (items) {
      items.forEach((item) => {
        arr.push({value: item.id, label: item.spe_name});
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
    }
  }
  return arr;
}