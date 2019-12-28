import {
  FILTER_MODE_OR,
  FILTER_MODE_AND,
  FILTER_OPER_LIKE,
  FILTER_OPER_EQUAL,
  FILTER_OPER_EMPTY,
  FILTER_OPER_NOT_EMPTY,
  FILTER_TYPE_GROUP,
  FILTER_TYPE_ELEM,
  FILTER_SEARCH_NONE,
  FILTER_SEARCH_QUICK,
  FILTER_SEARCH_SIMPLE
} from './';

/**
 * Manage filters
 */
export default class Filter {
  constructor() {
    this.init();
  }

  init(mode = FILTER_MODE_OR, operator = FILTER_OPER_LIKE) {
    this.data = {
      operator: FILTER_OPER_LIKE,
      mode: FILTER_MODE_OR,
      filters: [],
      filter: FILTER_TYPE_GROUP,
      filter_name: '',
      filter_crits: [],
      search: FILTER_SEARCH_NONE,
    };
    this.data.mode = mode;
    this.data.operator = operator;
  }

  setOperator(oper) {
    this.data.operator = oper;
  }

  getOperator() {
    return this.data.operator;
  }

  setMode(mode) {
    this.data.mode = mode;
  }

  getMode() {
    return this.data.mode;
  }

  setFilterName(name) {
    this.data.filter_name = name;
    this.data.filter = FILTER_TYPE_ELEM;
  }

  getFilterName() {
    return this.data.filter_name;
  }

  setFilterCrit(value, oper = false) {
    let myOper = this.data.operator;
    if (oper !== false) {
      myOper = oper;
    }
    this.data.filter_crits[myOper] = value;
  }

  getFilterCrit(oper = false) {
    let myOper = this.data.operator;
    if (oper !== false) {
      myOper = oper;
    }
    if (this.data.filter_crits[myOper]) {
      return this.data.filter_crits[myOper];
    }
    return '';
  }

  getFilterCrits() {
    return this.data.filter_crits;
  }

  setSearch(search) {
    this.data.search = search;
  }

  getSearch() {
    return this.data.search;
  }

  checkFilters() {
    let filters = [];
    this.data.filters.forEach(elt => {
      let add = false;
      const crits3 = elt.getFilterCrits();
      Object.keys(crits3).forEach(key => {
        if (crits3[key] !== '') {
          add = true;
        }
      });
      if (add) {
        filters.push(elt);
      }
    });
    this.data.filters = filters;
  }

  addFilter(name, value, oper = false) {
    let elt = this.data.filters.find(elt => {
      return elt.getFilterName() === name;
    });
    if (elt) {
      elt.setFilterCrit(value, oper);
    } else {
      let elt2 = new Filter();
      elt2.setFilterName(name);
      elt2.setFilterCrit(value, oper);
      this.data.filters.push(elt2);
    }
    this.checkFilters();
  }

  findFirst(name) {
    return this.data.filters.find(elt => elt.getFilterName() === name);
  }

  asJsonApiObject() {
    let params = {};
    if (this.data.filters.length > 0) {
      params.filter = {};
      let crits = {};
      this.data.filters.forEach(elt => {
        let crits2 = [];
        const crits3 = elt.getFilterCrits();
        Object.keys(crits3).forEach(key => {
          crits2[key] = crits3[key];
        });
        crits[elt.getFilterName()] = crits2;
      });
      if (this.data.mode === FILTER_MODE_OR) {
        params.filter.or = crits;
      } else {
        params.filter.and = crits;
      }
    }
    return params;
  }

  clone() {
    let newFilter = new Filter();
    const datas = this.data;
    newFilter.data = { ...datas };
    return newFilter;
  }
}
