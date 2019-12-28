/* MODES */
export const FILTER_MODE_OR = 'OR';
export const FILTER_MODE_AND = 'AND';
/* OPERATORS */
export const FILTER_OPER_LIKE = 'contains';
export const FILTER_OPER_EQUAL = 'eq';
export const FILTER_OPER_EMPTY = 'EMPTY';
export const FILTER_OPER_NOT_EMPTY = 'NEMPTY';
/* TYPES */
export const FILTER_TYPE_GROUP = 'GROUP';
export const FILTER_TYPE_ELEM = 'ELEM';
/* SEARCH MODE */
export const FILTER_SEARCH_NONE = 'NONE';
export const FILTER_SEARCH_QUICK = "QUICK";
export const FILTER_SEARCH_SIMPLE = 'SIMPLE';

export { default as Filter } from './Filter';
export { default as FilterBuilder } from './FilterBuilder';
