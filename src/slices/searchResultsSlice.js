/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const searchResults = createSlice({
  name: 'searchResults',
  initialState: {},
  reducers: {
    addItemToSearchResults(state, action) {
      state.byId[action.payload.id] = action.payload;
      state.allIds.push(action.payload.id);
    },
    updateItemInSearchResults(state, action) {
      state.byId[action.payload.id] = {
        ...state.byId[action.payload.id],
        ...action.payload,
        detalised: true,
      };
    },
    clearSearchResults(state) {
      state.byId = {};
      state.allIds = [];
    },
  },
});

export const {
  addItemToSearchResults,
  updateItemInSearchResults,
  clearSearchResults,
} = searchResults.actions;

export default searchResults.reducer;
