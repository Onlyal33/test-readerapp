import { configureStore, combineReducers } from '@reduxjs/toolkit';

import itemsReducer from '../features/items/itemsSlice.js';
import listsReducer from '../features/lists/listsSlice.js';
import uiReducer from '../features/uiSlice.js';
import listItemReducer from '../features/items/listItemSlice.js';
import searchResultsReducer from '../features/search/searchResultsSlice.js';
import getLocalStorageFunc from '../common/localStorage.js';

const loadState = getLocalStorageFunc('load');

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
      ...loadState(),
    },
  },
});

export default store;
