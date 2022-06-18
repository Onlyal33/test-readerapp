/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';

import searchAPI from '../../common/searchAPI.js';

export const fetchSearchResults = createAsyncThunk(
  'searchResults/fetchSearchResults',
  async ({ values, actions }) => {
    const filteredEntries = Object.entries(values).filter(([, value]) => value !== '');
    const { data } = await searchAPI.search(Object.fromEntries(filteredEntries));
    actions.resetForm();
    return { items: data.docs, searchResultsNumber: data.numFound };
  },
);

export const fetchItemById = createAsyncThunk(
  'searchResults/fetchItemById',
  async (id) => {
    const { data } = await searchAPI.fetchItemById(id);
    return { id, data };
  },
);

const searchResults = createSlice({
  name: 'searchResults',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    searchHidden(state) {
      if (state.allIds.length > 0) {
        state.byId = {};
        state.allIds = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        const byId = {};
        const allIds = [];
        const languageNames = new Intl.DisplayNames(['en'], {
          type: 'language',
        });
        action.payload.items.forEach(({
          key: id,
          author_name: author,
          first_publish_year: firstPublishYear,
          language = [],
          place = [],
          subject = [],
          title,
        }) => {
          byId[id] = {
            id,
            author,
            firstPublishYear,
            language: language.map((el) => languageNames.of(el)),
            place,
            subject,
            title,
          };
          allIds.push(id);
        });
        state.byId = byId;
        state.allIds = allIds;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        const { description } = action.payload.data;
        state.byId[action.payload.id].description = description?.value ?? description;
        state.byId[action.payload.id].detalised = true;
      });
  },
});

export const {
  itemUpdatedInSearchResults,
  searchHidden,
} = searchResults.actions;

export default searchResults.reducer;

export const selectSearchItemsIds = (state) => state.entities.searchResults.allIds;

export const selectSearchItems = (state) => state.entities.searchResults.byId;

export const selectSearchItem = createSelector(
  [selectSearchItems, (_, id) => id],
  (items, id) => items[id],
);

export const selectIsItemDetalised = createSelector(
  [selectSearchItems, (_, id) => id],
  (items, id) => items[id].detalised,
);

export const fetchDetalisedItemById = (id) => async (dispatch, getState) => {
  if (getState().ui.displayingItemType !== 'search' || selectIsItemDetalised(getState(), id)) {
    return;
  }
  await dispatch(fetchItemById(id));
};
