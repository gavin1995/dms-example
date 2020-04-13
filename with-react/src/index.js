import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './components/Root';
import './index.less';

render(
  <AppContainer>
    <Root history={history} />
  </AppContainer>,
  document.getElementById('content')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const AppRoot = require('./components/Root').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <AppRoot history={history} />
      </AppContainer>,
      document.getElementById('content')
    );
  });
}
