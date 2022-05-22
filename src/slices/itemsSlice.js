/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: {},
  reducers: {
    setInitialState(state, action) {
      state.byId = action.payload.byId;
      state.allIds = action.payload.allIds;
    },
    addItem(state, action) {
      state.byId[action.payload.id] = action.payload;
      state.allIds.push(action.payload.id);
    },
    deleteItem(state, action) {
      const idToDelete = action.payload.id;
      const { [idToDelete]: deleted, ...modifiedState } = state.byId;
      state.byId = modifiedState;
      state.allIds = state.allIds.filter((id) => id !== idToDelete);
    },
    toggleReadStatus(state, action) {
      state.byId[action.payload.id].isRead = !state.byId[action.payload.id].isRead;
    },
    saveNotes(state, action) {
      state.byId[action.payload.id].notes = action.payload.notes;
    },
  },
});

export const {
  setInitialState,
  addItem,
  deleteItem,
  toggleReadStatus,
  saveNotes,
} = itemsSlice.actions;

export default itemsSlice.reducer;
