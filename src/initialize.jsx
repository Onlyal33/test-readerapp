import React from 'react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './App.jsx';
import itemsReducer from './slices/itemsSlice.js';
import listsReducer from './slices/listsSlice.js';
import uiReducer from './slices/uiSlice.js';
import listItemReducer from './slices/listItemSlice.js';
import searchResultsReducer from './slices/searchResultsSlice.js';

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
          byId: {
            list_0: {
              id: 'list_0',
              name: 'Your Library',
              type: 'default',
            },
          },
          allIds: ['list_0'],
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
        activeList: 'list_0',
        activeItem: null,
        searchVisibility: 'invisible',
        filteringStatus: 'all',
        displayingItemType: 'library',
        modals: { isOpen: false, type: null, item: null },
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
