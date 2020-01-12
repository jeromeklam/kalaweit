import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_UPLOAD_PHOTO_BEGIN,
  CAUSE_UPLOAD_PHOTO_SUCCESS,
  CAUSE_UPLOAD_PHOTO_FAILURE,
  CAUSE_UPLOAD_PHOTO_DISMISS_ERROR,
} from '../../../../src/features/cause/redux/constants';

import {
  uploadPhoto,
  dismissUploadPhotoError,
  reducer,
} from '../../../../src/features/cause/redux/uploadPhoto';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause/redux/uploadPhoto', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when uploadPhoto succeeds', () => {
    const store = mockStore({});

    return store.dispatch(uploadPhoto())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_UPLOAD_PHOTO_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_UPLOAD_PHOTO_SUCCESS);
      });
  });

  it('dispatches failure action when uploadPhoto fails', () => {
    const store = mockStore({});

    return store.dispatch(uploadPhoto({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_UPLOAD_PHOTO_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_UPLOAD_PHOTO_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUploadPhotoError', () => {
    const expectedAction = {
      type: CAUSE_UPLOAD_PHOTO_DISMISS_ERROR,
    };
    expect(dismissUploadPhotoError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_UPLOAD_PHOTO_BEGIN correctly', () => {
    const prevState = { uploadPhotoPending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_UPLOAD_PHOTO_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadPhotoPending).toBe(true);
  });

  it('handles action type CAUSE_UPLOAD_PHOTO_SUCCESS correctly', () => {
    const prevState = { uploadPhotoPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_UPLOAD_PHOTO_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadPhotoPending).toBe(false);
  });

  it('handles action type CAUSE_UPLOAD_PHOTO_FAILURE correctly', () => {
    const prevState = { uploadPhotoPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_UPLOAD_PHOTO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadPhotoPending).toBe(false);
    expect(state.uploadPhotoError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_UPLOAD_PHOTO_DISMISS_ERROR correctly', () => {
    const prevState = { uploadPhotoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_UPLOAD_PHOTO_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadPhotoError).toBe(null);
  });
});

