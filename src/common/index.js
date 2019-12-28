export { default as freeAssoApi } from './api';
export { initAxios } from './init';
export { buildModel } from './reduxModel';
export { buildFirstModel } from './reduxModel';
export { jsonApiNormalizer } from './jsonApiNormalizer';
export { jsonApiUpdate } from './jsonApiNormalizer';
export { getJsonApi } from './jsonApiNormalizer';
export { addRelationships } from './jsonApiNormalizer';
export { getJsonApiWithRelationships } from './jsonApiNormalizer';
export { getFieldError } from './jsonApiNormalizer';
export { default as getFieldErrorMessage } from './errorNormalizer';

/**/
export { propagateModel } from './update';

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

export function queryStringToObject(search = '') {
  if (search.indexOf('?') >= 0) {
    let params = {};
    const hashes = search.slice(search.indexOf('?') + 1).split('&');
    hashes.forEach(hash => {
      const oneParam = hash.split('=');
      params[oneParam[0]] = decodeURIComponent(oneParam[1]);
    });
    return params;
  }
  return {};
}

export function objectToQueryString (queryObj, nesting_start = "", level = 0) {
  let l_nesting_start = nesting_start;
  let l_nesting_end = "";
  if (level > 0) {
    l_nesting_start += '[';
    l_nesting_end += ']';
  }
  const pairs = Object.entries(queryObj).map(([key, val]) => {
    if (typeof val === "object") {
      return objectToQueryString(val, l_nesting_start + `${key}` + l_nesting_end, level+1);
    } else {
      return [l_nesting_start + key + l_nesting_end, val].join("=");
    }
  });
  let queryString = pairs.join("&");
  if (level === 0 && queryString !== '') {
    queryString = '?' + queryString;
  }
  return queryString
}

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
