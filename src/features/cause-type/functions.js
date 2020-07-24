import { normalizedObjectModeler } from 'freejsonapi';

export const causeTypeMntType = [
  { value: 'ANNUAL', label: 'Annuelle glissante' },
  { value: 'MAXIMUM', label: 'Objectif' },
  { value: 'OTHER', label: 'Aucune' },
];

export const causeTypeFamily = [
  { value: 'ANIMAL', label: 'Animal' },
  { value: 'NATURE', label: 'Nature' },
  { value: 'ADMINISTRATIV', label: 'Association' },
  { value: 'OTHER', label: 'Autre' },
];

/**
 * 
 */
export function getCausetype(objects, caut_id) {
  let causeType = null;
  if (objects) {
    let items = normalizedObjectModeler(
      objects,
      'FreeAsso_CauseType',
    );
    if (items) {
      const item = items.find(elem => elem.id === caut_id)
      if (item) {
        causeType = item;
      }
    }
  }
  return causeType;
}

/**
 * Export all cause types as an array of value=>label
 *
 * @param {object} object
 *
 * @return {array}
 */
export function causeTypeAsOptions(object) {
  let arr = [];
  if (object) {
    let items = normalizedObjectModeler(object, 'FreeAsso_CauseType');
    if (items) {
      items.forEach(item => {
        arr.push({ value: item.id, label: item.caut_name });
      });
      arr.sort(function(a, b) {
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
