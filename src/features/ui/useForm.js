import { useState } from 'react';
import { jsonApiNormalizer, buildModel } from 'freejsonapi';
import { freeAssoApi } from '../../common';

const explodeReduxModel = obj => {
  let ret = { ...obj };
  return ret;
};

const _loadSite = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/site/' + id, {});
};

const _loadCause = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/cause/' + id, {});
};

const _loadClient = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/client/' + id, {});
};

const useForm = (initialState, initialTab, onSubmit, onCancel) => {
  const [values, setValues] = useState({
    ...initialState,
    currentTab: initialTab,
    loadClient: false,
    loadCause: false,
    loadSite: false,
  });

  const handleSubmit = event => {
    if (event) event.preventDefault();
    onSubmit(values);
  };

  const handleChange = event => {
    if (event && event.persist) {
      event.persist();
    }
    const tType = event.target.type || 'text';
    const tName = event.target.name;
    const elems = tName.split('.');
    const first = elems.shift();
    let datas = null;
    if (elems.length <= 0) {
      switch (tType) {
        case 'checkbox':
          datas = event.target.checked || false;
          values[first] = datas;
          break;
        case 'FreeAsso_Cause':
          if (!values.loadCause) {
            const id = event.target.value || '0';
            values.loadCause = true;
            setValues(explodeReduxModel(values));
            _loadCause(id)
              .then(result => {
                values.loadCause = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_Cause', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadCause = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        case 'FreeAsso_Client':
          if (!values.loadClient) {
            const id = event.target.value || '0';
            values.loadClient = true;
            setValues(explodeReduxModel(values));
            _loadClient(id)
              .then(result => {
                values.loadClient = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_Client', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadClient = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        case 'FreeAsso_Site':
          if (!values.loadSite) {
            const id = event.target.value || '0';
            values.loadSite = true;
            setValues(explodeReduxModel(values));
            _loadSite(id)
              .then(result => {
                values.loadSite = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_Site', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadSite = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        default:
          datas = event.target.value;
          values[first] = datas;
          break;
      }
    } else {
      datas = values[first];
      const second = elems.shift();
      switch (tType) {
        case 'checkbox':
          datas[second] = event.target.checked || false;
          values[first] = datas;
          break;
        case 'FreeAsso_Cause':
          if (!values.loadCause) {
            const id = event.target.value || '0';
            values.loadCause = true;
            setValues(explodeReduxModel(values));
            _loadCause(id)
              .then(result => {
                values.loadCause = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_Cause', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadCause = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        case 'FreeAsso_Client':
          if (!values.loadClient) {
            const id = event.target.value || '0';
            values.loadClient = true;
            setValues(explodeReduxModel(values));
            _loadClient(id)
              .then(result => {
                values.loadClient = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_Client', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadClient = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        case 'FreeAsso_Site':
          if (!values.loadSite) {
            const id = event.target.value || '0';
            values.loadSite = true;
            setValues(explodeReduxModel(values));
            _loadSite(id)
              .then(result => {
                values.loadSite = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_Site', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadSite = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        default:
          datas[second] = event.target.value;
          values[first] = datas;
          break;
      }
    }
    setValues(explodeReduxModel(values));
  };

  const handleCancel = event => {
    if (event) event.preventDefault();
    onCancel();
  };

  const handleNavTab = keyTab => {
    setValues({ ...values, currentTab: keyTab });
  };

  return {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
  };
};

export default useForm;