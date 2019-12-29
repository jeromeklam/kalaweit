import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import configStore from './common/configStore';
import routeConfig from './common/routeConfig';
import Root from './Root';
import { initAxios } from './common';

const store = configStore();

function renderApp(app) {
  initAxios()
  render(
    <AppContainer>
      {app}
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp(<Root store={store} routeConfig={routeConfig} />);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./common/routeConfig', () => {
    const nextRouteConfig = require('./common/routeConfig').default; // eslint-disable-line
    renderApp(<Root store={store} routeConfig={nextRouteConfig} />);
  });
  module.hot.accept('./Root', () => {
    const nextRoot = require('./Root').default; // eslint-disable-line
    renderApp(<Root store={store} routeConfig={routeConfig} />);
  });
}