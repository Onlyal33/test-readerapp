import React from 'react';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from './store.js';

// eslint-disable-next-line arrow-body-style
export default () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};
