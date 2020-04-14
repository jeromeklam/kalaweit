import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_LOAD_NEWS_BEGIN,
  CAUSE_LOAD_NEWS_SUCCESS,
  CAUSE_LOAD_NEWS_FAILURE,
  CAUSE_LOAD_NEWS_DISMISS_ERROR,
} from '../../../../src/features/cause/redux/constants';

import {
  loadNews,
  dismissLoadNewsError,
  reducer,
} from '../../../../src/features/cause/redux/loadNews';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause/redux/loadNews', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadNews succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadNews())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_LOAD_NEWS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_LOAD_NEWS_SUCCESS);
      });
  });

  it('dispatches failure action when loadNews fails', () => {
    const store = mockStore({});

    return store.dispatch(loadNews({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_LOAD_NEWS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_LOAD_NEWS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadNewsError', () => {
    const expectedAction = {
      type: CAUSE_LOAD_NEWS_DISMISS_ERROR,
    };
    expect(dismissLoadNewsError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_LOAD_NEWS_BEGIN correctly', () => {
    const prevState = { loadNewsPending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_NEWS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadNewsPending).toBe(true);
  });

  it('handles action type CAUSE_LOAD_NEWS_SUCCESS correctly', () => {
    const prevState = { loadNewsPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_NEWS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadNewsPending).toBe(false);
  });

  it('handles action type CAUSE_LOAD_NEWS_FAILURE correctly', () => {
    const prevState = { loadNewsPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_NEWS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadNewsPending).toBe(false);
    expect(state.loadNewsError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_LOAD_NEWS_DISMISS_ERROR correctly', () => {
    const prevState = { loadNewsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_NEWS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadNewsError).toBe(null);
  });
});

