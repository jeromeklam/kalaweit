import {Filter} from '../../filter';

const initialState = {
  items: [],
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  tab: "1",
  tabs: [
    {key:"1", name:"identification", label:"Identification", shortcut:"A", icon:"cause"},
    {key:"2", name:"mouvements", label:"Mouvements", shortcut:"M", icon:"move"},
    {key:"3", name:"divers", label:"Divers", shortcut:"D", icon:"misc"}
  ], 
  filters: new Filter(),
  sort: [{col:"cau_name",way:"up"}],
  loadMorePending: false,
  loadMoreFinish: false,
  loadMoreError: null,
  loadOnePending: false,
  loadOneItem: null,
  loadOneError: null,
  createOnePending: false,
  createOneError: null,
  updateOnePending: false,
  updateOneError: null,
  delOnePending: false,
  delOneError: null
};

export default initialState;
