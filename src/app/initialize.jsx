import React from 'react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './App.jsx';
import itemsReducer from '../features/items/itemsSlice.js';
import listsReducer from '../features/lists/listsSlice.js';
import uiReducer from '../features/uiSlice.js';
import listItemReducer from '../features/items/listItemSlice.js';
import searchResultsReducer from '../features/search/searchResultsSlice.js';
import useLocalStorage from '../common/useLocalStorage.js';

const initialize = () => {
  const { loadFromLocalStorage } = useLocalStorage();
  const localState = loadFromLocalStorage();

  const store = configureStore({
    reducer: {
      entities: combineReducers({
        items: itemsReducer,
        lists: listsReducer,
        listItem: listItemReducer,
        searchResults: searchResultsReducer,
      }),
      ui: uiReducer,
    },
    preloadedState: {
      entities: {
        ...localState,
      },
    },
  });

  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

export default initialize;
