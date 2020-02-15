import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  DONATION_LOAD_DONATIONS_BEGIN,
  DONATION_LOAD_DONATIONS_SUCCESS,
  DONATION_LOAD_DONATIONS_FAILURE,
  DONATION_LOAD_DONATIONS_DISMISS_ERROR,
} from '../../../../src/features/donation/redux/constants';

import {
  loadDonations,
  dismissLoadDonationsError,
  reducer,
} from '../../../../src/features/donation/redux/loadDonations';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('donation/redux/loadDonations', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadDonations succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadDonations())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DONATION_LOAD_DONATIONS_BEGIN);
        expect(actions[1]).toHaveProperty('type', DONATION_LOAD_DONATIONS_SUCCESS);
      });
  });

  it('dispatches failure action when loadDonations fails', () => {
    const store = mockStore({});

    return store.dispatch(loadDonations({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DONATION_LOAD_DONATIONS_BEGIN);
        expect(actions[1]).toHaveProperty('type', DONATION_LOAD_DONATIONS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadDonationsError', () => {
    const expectedAction = {
      type: DONATION_LOAD_DONATIONS_DISMISS_ERROR,
    };
    expect(dismissLoadDonationsError()).toEqual(expectedAction);
  });

  it('handles action type DONATION_LOAD_DONATIONS_BEGIN correctly', () => {
    const prevState = { loadDonationsPending: false };
    const state = reducer(
      prevState,
      { type: DONATION_LOAD_DONATIONS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadDonationsPending).toBe(true);
  });

  it('handles action type DONATION_LOAD_DONATIONS_SUCCESS correctly', () => {
    const prevState = { loadDonationsPending: true };
    const state = reducer(
      prevState,
      { type: DONATION_LOAD_DONATIONS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadDonationsPending).toBe(false);
  });

  it('handles action type DONATION_LOAD_DONATIONS_FAILURE correctly', () => {
    const prevState = { loadDonationsPending: true };
    const state = reducer(
      prevState,
      { type: DONATION_LOAD_DONATIONS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadDonationsPending).toBe(false);
    expect(state.loadDonationsError).toEqual(expect.anything());
  });

  it('handles action type DONATION_LOAD_DONATIONS_DISMISS_ERROR correctly', () => {
    const prevState = { loadDonationsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: DONATION_LOAD_DONATIONS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadDonationsError).toBe(null);
  });
});

