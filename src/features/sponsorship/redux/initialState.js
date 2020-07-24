import { getNewNormalizedObject } from 'freejsonapi';

const initialState = {
  sponsorships: [],
  sponsorshipsModels: [],
  cli_id: null,
  cau_id: null,
  emptyItem: null,
  items: getNewNormalizedObject('FreeAsso_Sponsorship'),
  loadSponsorshipsPending: false,
  loadSponsorshipsError: null,
  loadOnePending: false,
  loadOneError: null,
  loadOneItem: null,
  createOnePending: false,
  createOneError: null,
  delOnePending: false,
  delOneError: null,
  updateOnePending: false,
  updateOneError: null,
};

export default initialState;
