/* eslint-disable no-param-reassign */
import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDetalisedItem } from '../search/searchResultsSlice.js';

export const itemAddedToLibrary = createAsyncThunk(
  'items/itemAddedToLibrary',
  async (item, { dispatch, getState }) => {
    if (getState().entities.searchResults.byId[item.id].detalised) {
      return item;
    }

    const detalisedItem = await dispatch(fetchDetalisedItem(item));
    return detalisedItem;
  },
);

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(itemAddedToLibrary.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload;
        state.allIds.push(action.payload.id);
      });
  },
});

export const {
  itemRemovedFromLibrary,
  readStatusToggled,
  notesChanged,
} = itemsSlice.actions;

export default itemsSlice.reducer;

export const selectLibraryItemsIds = (state) => state.entities.items.allIds;

export const selectLibraryItems = (state) => state.entities.items.byId;

export const selectIsItemInLibrary = createSelector(
  [selectLibraryItemsIds, (_, id) => id],
  (ids, id) => ids.includes(id),
);

export const selectLibraryItem = createSelector(
  [selectLibraryItems, (_, id) => id],
  (items, id) => items[id],
);
