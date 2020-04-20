import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_LOAD_SPONSORS_BEGIN,
  CAUSE_LOAD_SPONSORS_SUCCESS,
  CAUSE_LOAD_SPONSORS_FAILURE,
  CAUSE_LOAD_SPONSORS_DISMISS_ERROR,
} from '../../../../src/features/cause/redux/constants';

import {
  loadSponsors,
  dismissLoadSponsorsError,
  reducer,
} from '../../../../src/features/cause/redux/loadSponsors';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause/redux/loadSponsors', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadSponsors succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadSponsors())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_LOAD_SPONSORS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_LOAD_SPONSORS_SUCCESS);
      });
  });

  it('dispatches failure action when loadSponsors fails', () => {
    const store = mockStore({});

    return store.dispatch(loadSponsors({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_LOAD_SPONSORS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_LOAD_SPONSORS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadSponsorsError', () => {
    const expectedAction = {
      type: CAUSE_LOAD_SPONSORS_DISMISS_ERROR,
    };
    expect(dismissLoadSponsorsError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_LOAD_SPONSORS_BEGIN correctly', () => {
    const prevState = { loadSponsorsPending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_SPONSORS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadSponsorsPending).toBe(true);
  });

  it('handles action type CAUSE_LOAD_SPONSORS_SUCCESS correctly', () => {
    const prevState = { loadSponsorsPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_SPONSORS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadSponsorsPending).toBe(false);
  });

  it('handles action type CAUSE_LOAD_SPONSORS_FAILURE correctly', () => {
    const prevState = { loadSponsorsPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_SPONSORS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadSponsorsPending).toBe(false);
    expect(state.loadSponsorsError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_LOAD_SPONSORS_DISMISS_ERROR correctly', () => {
    const prevState = { loadSponsorsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_SPONSORS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadSponsorsError).toBe(null);
  });
});

