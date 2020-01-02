import { buildModel } from 'freejsonapi';

/**
 * Export all site types as an array of value=>label
 *
 * @param {object} object
 *
 * @return {array}
 */
export function configAsOptions(object) {
  let arr = [];
  let items = buildModel(object, 'FreeAsso_Config');
  console.log('configAsOptions', items);x
  console.log('configAsOptions2', object);
  return arr;
}
