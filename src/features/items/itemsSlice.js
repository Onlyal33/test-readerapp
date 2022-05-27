/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    itemAddedToLibrary(state, action) {
      state.byId[action.payload.id] = action.payload;
      state.allIds.push(action.payload.id);
    },
    itemRemovedFromLibrary(state, action) {
      const idToDelete = action.payload.id;
      const { [idToDelete]: deleted, ...modifiedState } = state.byId;
      state.byId = modifiedState;
      state.allIds = state.allIds.filter((id) => id !== idToDelete);
    },
    readStatusToggled(state, action) {
      state.byId[action.payload.id].isRead = !state.byId[action.payload.id].isRead;
    },
    notesChanged(state, action) {
      state.byId[action.payload.id].notes = action.payload.notes;
    },
  },
});

export const {
  itemAddedToLibrary,
  itemRemovedFromLibrary,
  readStatusToggled,
  notesChanged,
} = itemsSlice.actions;

export default itemsSlice.reducer;

export const selectIsItemInLibrary = (id) => (state) => state.entities.items.allIds.includes(id);

export const selectLibraryItemsIds = (state) => state.entities.items.allIds;

export const selectLibraryItems = (state) => state.entities.items.byId;

export const selectLibraryItem = (id) => (state) => state.entities.items.byId[id];
