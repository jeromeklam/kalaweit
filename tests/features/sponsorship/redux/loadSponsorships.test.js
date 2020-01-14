import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SPONSORSHIP_LOAD_SPONSORSHIPS_BEGIN,
  SPONSORSHIP_LOAD_SPONSORSHIPS_SUCCESS,
  SPONSORSHIP_LOAD_SPONSORSHIPS_FAILURE,
  SPONSORSHIP_LOAD_SPONSORSHIPS_DISMISS_ERROR,
} from '../../../../src/features/sponsorship/redux/constants';

import {
  loadSponsorships,
  dismissLoadSponsorshipsError,
  reducer,
} from '../../../../src/features/sponsorship/redux/loadSponsorships';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('sponsorship/redux/loadSponsorships', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadSponsorships succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadSponsorships())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SPONSORSHIP_LOAD_SPONSORSHIPS_BEGIN);
        expect(actions[1]).toHaveProperty('type', SPONSORSHIP_LOAD_SPONSORSHIPS_SUCCESS);
      });
  });

  it('dispatches failure action when loadSponsorships fails', () => {
    const store = mockStore({});

    return store.dispatch(loadSponsorships({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SPONSORSHIP_LOAD_SPONSORSHIPS_BEGIN);
        expect(actions[1]).toHaveProperty('type', SPONSORSHIP_LOAD_SPONSORSHIPS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadSponsorshipsError', () => {
    const expectedAction = {
      type: SPONSORSHIP_LOAD_SPONSORSHIPS_DISMISS_ERROR,
    };
    expect(dismissLoadSponsorshipsError()).toEqual(expectedAction);
  });

  it('handles action type SPONSORSHIP_LOAD_SPONSORSHIPS_BEGIN correctly', () => {
    const prevState = { loadSponsorshipsPending: false };
    const state = reducer(
      prevState,
      { type: SPONSORSHIP_LOAD_SPONSORSHIPS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadSponsorshipsPending).toBe(true);
  });

  it('handles action type SPONSORSHIP_LOAD_SPONSORSHIPS_SUCCESS correctly', () => {
    const prevState = { loadSponsorshipsPending: true };
    const state = reducer(
      prevState,
      { type: SPONSORSHIP_LOAD_SPONSORSHIPS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadSponsorshipsPending).toBe(false);
  });

  it('handles action type SPONSORSHIP_LOAD_SPONSORSHIPS_FAILURE correctly', () => {
    const prevState = { loadSponsorshipsPending: true };
    const state = reducer(
      prevState,
      { type: SPONSORSHIP_LOAD_SPONSORSHIPS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadSponsorshipsPending).toBe(false);
    expect(state.loadSponsorshipsError).toEqual(expect.anything());
  });

  it('handles action type SPONSORSHIP_LOAD_SPONSORSHIPS_DISMISS_ERROR correctly', () => {
    const prevState = { loadSponsorshipsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SPONSORSHIP_LOAD_SPONSORSHIPS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadSponsorshipsError).toBe(null);
  });
});

