/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const searchResults = createSlice({
  name: 'searchResults',
  initialState: {},
  reducers: {
    searchCompleted(state, action) {
      const byId = {};
      const allIds = [];
      action.payload.items.forEach((item) => {
        byId[item.id] = item;
        allIds.push(item.id);
      });
      state.byId = byId;
      state.allIds = allIds;
    },
    itemUpdatedInSearchResults(state, action) {
      state.byId[action.payload.id] = {
        ...state.byId[action.payload.id],
        ...action.payload,
        detalised: true,
      };
    },
    searchHidden(state) {
      if (state.allIds.length > 0) {
        state.byId = {};
        state.allIds = [];
      }
    },
  },
});

export const {
  searchCompleted,
  itemUpdatedInSearchResults,
  searchHidden,
} = searchResults.actions;

export default searchResults.reducer;
