/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { deleteList } from './lists/listsSlice.js';
import { deleteItem } from './items/itemsSlice.js';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {},
  reducers: {
    openModal(state, action) {
      state.modals.isOpen = true;
      state.modals.type = action.payload.type;
      state.modals.item = action.payload.item;
    },
    closeModal(state) {
      state.modals.isOpen = false;
      state.modals.type = null;
      state.modals.item = null;
    },
    changeActiveList(state, action) {
      state.activeList = action.payload.id;
      state.activeItem = null;
    },
    changeActiveItem(state, action) {
      state.activeItem = action.payload.id;
    },
    toggleSearchVisibility(state) {
      state.searchVisibility = state.searchVisibility === 'visible' ? 'invisible' : 'visible';
    },
    toggleFilter(state) {
      state.filteringStatus = state.filteringStatus === 'all' ? 'unread' : 'all';
    },
    changeDisplayingItemType(state, action) {
      state.displayingItemType = action.payload;
    },
    setSearchResultsNumber(state, action) {
      state.searchResultsNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteList, (state, action) => {
        const idToDelete = action.payload.id;
        if (state.activeList === idToDelete) {
          state.activeList = '0';
        }
      })
      .addCase(deleteItem, (state, action) => {
        const idToDelete = action.payload.id;
        if (state.activeItem === idToDelete) {
          state.activeItem = null;
        }
      });
  },
});

export const {
  changeActiveList,
  changeActiveItem,
  openModal,
  closeModal,
  toggleSearchVisibility,
  toggleFilter,
  changeDisplayingItemType,
  setSearchResultsNumber,
} = uiSlice.actions;

export default uiSlice.reducer;
