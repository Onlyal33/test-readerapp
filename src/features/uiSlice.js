/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { listDeleted } from './lists/listsSlice.js';
import { itemRemovedFromLibrary } from './items/itemsSlice.js';
import { searchCompleted, searchHidden } from './search/searchResultsSlice.js';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeList: null,
    activeItem: null,
    searchVisibility: 'invisible',
    readItemsVisibility: 'all',
    displayingItemType: 'library',
    modals: { isOpen: false, type: null, item: null },
    searchResultsNumber: null,
  },
  reducers: {
    modalOpened(state, action) {
      state.modals.isOpen = true;
      state.modals.type = action.payload.type;
      state.modals.item = action.payload.item;
    },
    modalClosed(state) {
      state.modals.isOpen = false;
      state.modals.type = null;
      state.modals.item = null;
    },
    activeListChanged(state, action) {
      state.displayingItemType = 'library';
      state.activeList = action.payload.id;
      state.activeItem = null;
    },
    activeItemChanged(state, action) {
      state.activeItem = action.payload.id;
    },
    advancedSearchVisibilityChanged(state) {
      state.searchVisibility = state.searchVisibility === 'visible' ? 'invisible' : 'visible';
    },
    readItemsVisibilityChanged(state) {
      state.readItemsVisibility = state.readItemsVisibility === 'all' ? 'unread' : 'all';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listDeleted, (state, action) => {
        const idToDelete = action.payload.id;
        if (state.activeList === idToDelete) {
          state.activeList = null;
        }
      })
      .addCase(itemRemovedFromLibrary, (state, action) => {
        const idToDelete = action.payload.id;
        if (state.activeItem === idToDelete) {
          state.activeItem = null;
        }
      })
      .addCase(searchCompleted, (state, action) => {
        state.displayingItemType = 'search';
        state.searchResultsNumber = action.payload.searchResultsNumber;
      })
      .addCase(searchHidden, (state) => {
        state.displayingItemType = 'library';
        state.searchResultsNumber = null;
      });
  },
});

export const {
  modalOpened,
  modalClosed,
  activeListChanged,
  activeItemChanged,
  advancedSearchVisibilityChanged,
  readItemsVisibilityChanged,
} = uiSlice.actions;

export default uiSlice.reducer;

export const selectDisplayingItemType = (state) => state.ui.displayingItemType;

export const selectSearchResultsNumber = (state) => state.ui.searchResultsNumber;

export const selectReadItemsVisibility = (state) => state.ui.readItemsVisibility;

export const selectIsAdvancedSearchVisible = (state) => state.ui.searchVisibility;

export const selectIsListActive = (id) => (state) => state.ui.activeList === id;

export const selectIsItemActive = (id) => (state) => state.ui.activeItem === id;

export const selectActiveListId = (state) => state.ui.activeList;

export const selectActiveItemId = (state) => state.ui.activeItem;
