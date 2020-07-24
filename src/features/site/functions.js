import { normalizedObjectModeler } from 'freejsonapi';

/**
 * Export all sites as an array of value=>label
 * 
 * @param {object} object
 * 
 * @return {array}
 */
export function siteAsOptions(object) {
  let arr   = [];
  if (object) {
    let items = normalizedObjectModeler(
      object,
      'FreeAsso_Site',
    );
    if (items) {
      items.forEach((item) => {
        arr.push({value: item.id, label: item.site_name});
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