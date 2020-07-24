import { normalizedObjectModeler } from 'freejsonapi';

export const causeMainTypeFamily = [
  { value: 'ANIMAL', label: 'Animal' },
  { value: 'NATURE', label: 'Nature' },
  { value: 'ADMINISTRATIV', label: 'Association' },
  { value: 'OTHER', label: 'Autre' },
];

/**
 * 
 */
export function getCauseMaintype(objects, camt_id) {
  let causeMainType = null;
  if (objects) {
    let items = normalizedObjectModeler(
      objects,
      'FreeAsso_CauseMainType',
    );
    if (items) {
      const item = items.find(elem => elem.id === camt_id)
      if (item) {
        causeMainType = item;
      }
    }
  }
  return causeMainType;
}

/**
 * Export all cause main types as an array of value=>label
 * 
 * @param {object} objects
 * 
 * @return {array}
 */
export function causeMainTypeAsOptions(objects) {
  let arr   = [];
  if (objects) {
    let items = normalizedObjectModeler(
      objects,
      'FreeAsso_CauseMainType',
    );
    if (items) {
      items.forEach((item) => {
        arr.push({value: item.id, label: item.camt_name});
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