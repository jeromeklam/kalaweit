import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_LOAD_ONE_MEDIA_BEGIN,
  CAUSE_LOAD_ONE_MEDIA_SUCCESS,
  CAUSE_LOAD_ONE_MEDIA_FAILURE,
  CAUSE_LOAD_ONE_MEDIA_DISMISS_ERROR,
} from '../../../../src/features/cause/redux/constants';

import {
  loadOneMedia,
  dismissLoadOneMediaError,
  reducer,
} from '../../../../src/features/cause/redux/loadOneMedia';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause/redux/loadOneMedia', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadOneMedia succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadOneMedia())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_LOAD_ONE_MEDIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_LOAD_ONE_MEDIA_SUCCESS);
      });
  });

  it('dispatches failure action when loadOneMedia fails', () => {
    const store = mockStore({});

    return store.dispatch(loadOneMedia({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_LOAD_ONE_MEDIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_LOAD_ONE_MEDIA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadOneMediaError', () => {
    const expectedAction = {
      type: CAUSE_LOAD_ONE_MEDIA_DISMISS_ERROR,
    };
    expect(dismissLoadOneMediaError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_LOAD_ONE_MEDIA_BEGIN correctly', () => {
    const prevState = { loadOneMediaPending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_ONE_MEDIA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadOneMediaPending).toBe(true);
  });

  it('handles action type CAUSE_LOAD_ONE_MEDIA_SUCCESS correctly', () => {
    const prevState = { loadOneMediaPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_ONE_MEDIA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadOneMediaPending).toBe(false);
  });

  it('handles action type CAUSE_LOAD_ONE_MEDIA_FAILURE correctly', () => {
    const prevState = { loadOneMediaPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_ONE_MEDIA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadOneMediaPending).toBe(false);
    expect(state.loadOneMediaError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_LOAD_ONE_MEDIA_DISMISS_ERROR correctly', () => {
    const prevState = { loadOneMediaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_ONE_MEDIA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadOneMediaError).toBe(null);
  });
});

