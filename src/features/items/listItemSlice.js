/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { deleteItem } from './itemsSlice.js';
import { deleteList } from '../lists/listsSlice.js';

const listItemSlice = createSlice({
  name: 'listItem',
  initialState: {},
  reducers: {
    addItemToList(state, action) {
      const { itemId, listId } = action.payload;
      const id = `${listId}_${itemId}`;
      state.byId[action.payload.id] = { id, listId, itemId };
      state.allIds.push(id);
    },
    removeItemFromList(state, action) {
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
      .addCase(deleteItem, (state, action) => {
        const idToRemove = action.payload.id;
        const modifiedState = Object.entries(state.byId)
          .filter(([, { itemId }]) => itemId !== idToRemove);
        state.byId = Object.fromEntries(modifiedState);
        state.allIds = modifiedState.map(([id]) => id);
      })
      .addCase(deleteList, (state, action) => {
        const idToRemove = action.payload.id;
        const modifiedState = Object.entries(state.byId)
          .filter(([, { listId }]) => listId !== idToRemove);
        state.byId = Object.fromEntries(modifiedState);
        state.allIds = modifiedState.map(([id]) => id);
      });
  },
});

export const {
  addItemToList,
  removeItemFromList,
} = listItemSlice.actions;

export default listItemSlice.reducer;
