/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { itemRemovedFromLibrary } from './itemsSlice.js';
import { listDeleted } from '../lists/listsSlice.js';

const listItemSlice = createSlice({
  name: 'listItem',
  initialState: {},
  reducers: {
    itemAddedToList(state, action) {
      const { itemId, listId } = action.payload;
      const id = `${listId}_${itemId}`;
      state.byId[id] = { id, listId, itemId };
      state.allIds.push(id);
    },
    itemRemovedFromList(state, action) {
      const { itemId, listId } = action.payload;
      const idToDelete = Object.values(state.byId)
        .find((el) => el.itemId === itemId && el.listId === listId).id;
      const { [idToDelete]: deleted, ...modifiedState } = state.byId;
      state.byId = modifiedState;
      state.allIds = state.allIds.filter((id) => id !== idToDelete);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(itemRemovedFromLibrary, (state, action) => {
        const idToRemove = action.payload.id;
        const modifiedState = Object.entries(state.byId)
          .filter(([, { itemId }]) => itemId !== idToRemove);
        state.byId = Object.fromEntries(modifiedState);
        state.allIds = modifiedState.map(([id]) => id);
      })
      .addCase(listDeleted, (state, action) => {
        const idToRemove = action.payload.id;
        const modifiedState = Object.entries(state.byId)
          .filter(([, { listId }]) => listId !== idToRemove);
        state.byId = Object.fromEntries(modifiedState);
        state.allIds = modifiedState.map(([id]) => id);
      });
  },
});

export const {
  itemAddedToList,
  itemRemovedFromList,
} = listItemSlice.actions;

export default listItemSlice.reducer;

export const selectListItem = (state) => state.entities.listItem.byId;
