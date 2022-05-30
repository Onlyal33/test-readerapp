/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { listDeleted } from './lists/listsSlice.js';
import { itemRemovedFromLibrary } from './items/itemsSlice.js';
import { fetchItemById, fetchSearchResults, searchHidden } from './search/searchResultsSlice.js';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeList: null,
    activeItem: null,
    readItemsVisibility: 'all',
    displayingItemType: 'library',
    search: {
      visibility: 'invisible',
      resultsNumber: null,
      status: 'idle',
      error: null,
      searchResultsNumber: null,
    },
    fetchItem: {
      status: 'idle',
      error: null,
    },
    modals: {
      isOpen: false,
      type: null,
      item: null,
    },
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
      state.search.visibility = state.search.visibility === 'visible' ? 'invisible' : 'visible';
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
      .addCase(fetchSearchResults.pending, (state) => {
        state.search.status = 'loading';
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.search.status = 'succeeded';
        state.displayingItemType = 'search';
        state.search.resultsNumber = action.payload.searchResultsNumber;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.search.status = 'failed';
        state.search.error = action.error.message;
      })
      .addCase(fetchItemById.pending, (state) => {
        state.fetchItem.status = 'loading';
      })
      .addCase(fetchItemById.fulfilled, (state) => {
        state.fetchItem.status = 'idle';
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.fetchItem.status = 'failed';
        state.fetchItem.error = action.error.message;
      })
      .addCase(searchHidden, (state) => {
        state.displayingItemType = 'library';
        state.search.status = 'idle';
        state.search.resultsNumber = null;
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

export const selectSearchResultsNumber = (state) => state.ui.search.resultsNumber;

export const selectReadItemsVisibility = (state) => state.ui.readItemsVisibility;

export const selectIsAdvancedSearchVisible = (state) => state.ui.search.visibility;

export const selectIsListActive = (id) => (state) => state.ui.activeList === id;

export const selectIsItemActive = (id) => (state) => state.ui.activeItem === id;

export const selectActiveListId = (state) => state.ui.activeList;

export const selectActiveItemId = (state) => state.ui.activeItem;

export const selectSearchStatus = (state) => state.ui.search.status;
