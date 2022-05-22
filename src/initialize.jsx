import React from 'react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './App.jsx';
import itemsReducer from './slices/itemsSlice.js';
import listsReducer from './slices/listsSlice.js';
import uiReducer from './slices/uiSlice.js';
import listItemReducer from './slices/listItemSlice.js';

const initialize = () => {
  const store = configureStore({
    reducer: {
      entities: combineReducers({
        items: itemsReducer,
        lists: listsReducer,
        listItem: listItemReducer,
      }),
      ui: uiReducer,
    },
    preloadedState: {
      entities: {
        items: {
          byId: {
            0: {
              id: '0',
              title: 'The Lord of The Rings',
              author: 'J.R.R.Tolkien',
              description: 'Best book ever',
              isRead: true,
              notes: '',
            },
            1: {
              id: '1',
              title: 'Dune',
              author: 'F.Herbert',
              description: 'They say it is best unread book ever',
              isRead: false,
              notes: '',
            },
          },
          allIds: ['0', '1'],
        },
        lists: {
          byId: {
            list_0: {
              id: 'list_0',
              name: 'Your Library',
              type: 'default',
            },
            list_1: {
              id: 'list_1',
              name: 'Example list',
              type: 'user',
            },
          },
          allIds: ['list_0', 'list_1'],
        },
        listItem: {
          byId: {
            0: {
              id: 'list_0_0',
              listId: 'list_0',
              itemId: '0',
            },
            1: {
              id: 'list_0_1',
              listId: 'list_0',
              itemId: '1',
            },
          },
          allIds: ['list_0_0', 'list_0_1'],
        },
      },
      ui: {
        activeList: '0',
        activeItem: null,
        previousList: null,
        searchVisibility: 'invisible',
        filteringStatus: 'all',
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
