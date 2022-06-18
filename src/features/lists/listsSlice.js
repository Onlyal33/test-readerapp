/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';

const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    listCreated(state, action) {
      state.byId[action.payload.id] = { ...action.payload, type: 'user' };
      state.allIds.push(action.payload.id);
    },
    listDeleted(state, action) {
      const idToDelete = action.payload.id;
      const { [idToDelete]: deleted, ...modifiedState } = state.byId;
      state.byId = modifiedState;
      state.allIds = state.allIds.filter((id) => id !== idToDelete);
    },
    listRenamed(state, action) {
      const { id, name } = action.payload;
      state.byId[id].name = name;
    },
  },
});

export const {
  listCreated,
  listDeleted,
  listRenamed,
} = listsSlice.actions;

export default listsSlice.reducer;

export const selectListsIds = (state) => state.entities.lists.allIds;

export const selectLists = (state) => state.entities.lists.byId;

export const selectList = createSelector(
  [selectLists, (_, id) => id],
  (lists, id) => lists[id] ?? { type: 'default', name: 'Library' },
);
