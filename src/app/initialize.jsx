import React from 'react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './App.jsx';
import itemsReducer from '../features/items/itemsSlice.js';
import listsReducer from '../features/lists/listsSlice.js';
import uiReducer from '../features/uiSlice.js';
import listItemReducer from '../features/items/listItemSlice.js';
import searchResultsReducer from '../features/search/searchResultsSlice.js';

const initialize = () => {
  const localState = (JSON.parse(localStorage.getItem('readerAppState')) ?? {});

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
        items: {
          byId: {},
          allIds: [],
        },
        lists: {
          byId: {},
          allIds: [],
        },
        listItem: {
          byId: {},
          allIds: [],
        },
        ...localState,
        searchResults: {
          byId: {},
          allIds: [],
        },
      },
      ui: {
        activeList: null,
        activeItem: null,
        searchVisibility: 'invisible',
        filteringStatus: 'all',
        displayingItemType: 'library',
        modals: { isOpen: false, type: null, item: null },
        searchResultsNumber: null,
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
