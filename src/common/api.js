import axios from 'axios';
import { store } from '../index.js';
import { initAxios } from './init';

const myAxios = axios.create({
  baseURL: process.env.REACT_APP_BO_URL,
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
  },
});
myAxios.interceptors.response.use(
  function(response) {
    let status = 200;
    if (response && response.status) {
      status = response.status;
    }
    if (status === 401 || status === '401') {
      initAxios('');
      const auth = (store && store.getState().auth.authenticated) || false;
      if (auth) {
        window.location.replace("/auth/signin");
      }
    }
    return response;
  },
  function(error) {
    if (error && error.response && 401 === error.response.status) {
      initAxios('');
      const auth = (store && store.getState().auth.authenticated) || false;
      console.log(auth, store.getState().auth);
      if (auth) {
        window.location.replace("/auth/signin");
      }
    }
    return Promise.reject(error);
  },
);

export default myAxios;
