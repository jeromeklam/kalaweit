export { default as freeAssoApi } from './api';
export { initAxios } from './init';

/**/
export { propagateModel } from './updateModel';

/**
 * 
 */
export function isInViewPort(el, threshold) {
  threshold = threshold || 0;

  var rect = el.getBoundingClientRect();
  var height = (rect.height || el.clientHeight || 0) + threshold;
  var width = (rect.width || el.clientWidth || 0) + threshold;

  return (
    rect.top >= -height &&
    rect.left >= -width &&
    rect.bottom <= height + window.innerHeight &&
    rect.right <= width + window.innerWidth
  );
}

/**
 * 
 */
export function getObjectmemberValue(obj, member) {
  const elems = member.split('.');
  let value = obj;
  while (elems.length > 0) {
    let mb = elems.shift();
    if (value.hasOwnProperty(mb)) {
      value = value[mb];
    } else {
      return null;
    }
  }
  return value;
}

/**
 * 
 */
export function modelsToSelect(models, value, label) {
  let arr = [];
  const ME = models.MAINELEM;
  const elems = models[ME];
  if (elems) {
    Object.keys(elems).forEach(oneKey => {
      const oneElem = elems[oneKey];
      arr.push({ value: oneElem.id, label: oneElem.attributes[label] });
    });
  }
  return arr;
}

/**
 * 
 */
export const intlDate = date => {
  if (date) {
    try {
      const laDate = new Date(date);
      return new Intl.DateTimeFormat('fr-FR').format(laDate);
    } catch (ex) {
      console.log(ex);
    }
  }
  return '';
}

/**
 * 
 */
export const inTheFuture = date => {
  if (date === null) {
    return true;
  }
  try {
    const laDate1 = Date.now();
    const laDate2 = new Date(date);
    if (laDate2 > laDate1) {
      return true;
    }
  } catch (ex) {}
  return false;
}

/**
 * 
 */
export const compareDate = (date1, date2) => {
  let result = 0;
  try {
    const laDate1 = new Date(date1);
    const laDate2 = new Date(date2);
    if (laDate1 < laDate2) {
      result = 1;
    } else if ( laDate1 > laDate2) {
      result = -1;
    }
  } catch (ex) {
    console.log(ex);
  }
  return result;
}