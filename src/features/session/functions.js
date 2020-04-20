import { buildModel } from 'freejsonapi';


/**
 * Export all session as an array of value=>label
 *
 * @param {object} object
 *
 * @return {array}
 */
export function sessionAsOptions(object) {
  let arr = [];
  let items = buildModel(object, 'FreeAsso_Session');
  items.forEach(item => {
    arr.push({ value: item.id, label: item.sess_name });
  });
  // Tri décroissant 
  arr.sort(function(a, b) {
    if (a.label < b.label) {
      return 1;
    } else {
      if (a.label > b.label) {
        return -1;
      }
    }
    return 0;
  });
  return arr;
}
