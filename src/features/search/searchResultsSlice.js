/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import searchAPI from '../../common/searchAPI.js';

const searchResults = createSlice({
  name: 'searchResults',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    searchCompleted(state, action) {
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
    },
    itemUpdatedInSearchResults(state, action) {
      const { description } = action.payload.data;
      state.byId[action.payload.id].description = description?.value ?? description;
      state.byId[action.payload.id].detalised = true;
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

export const selectSearchItemsIds = (state) => state.entities.searchResults.allIds;

export const selectSearchItems = (state) => state.entities.searchResults.byId;

export const selectSearchItem = (id) => (state) => state.entities.searchResults.byId[id];

export const selectIsItemDetalised = (id) => (state) => state
  .entities.searchResults.byId[id].detalised;
// thunks
export const fetchSearchedItems = (values, actions) => async (dispatch) => {
  const filteredEntries = Object.entries(values).filter(([, value]) => value !== '');
  try {
    const { data } = await searchAPI.search(Object.fromEntries(filteredEntries));
    actions.setSubmitting(false);
    actions.resetForm();
    dispatch(searchCompleted({ items: data.docs, searchResultsNumber: data.numFound }));
  } catch (e) {
    actions.setSubmitting(false);
    console.log(e);
    actions.setErrors(e);
  }
};

export const fetchDetalisedItemById = (id) => async (dispatch, getState) => {
  if (getState().ui.displayingItemType !== 'search' || selectIsItemDetalised(id)(getState())) {
    return;
  }

  try {
    const { data } = await searchAPI.fetchItemById(id);
    dispatch(itemUpdatedInSearchResults({ id, data }));
  } catch (e) {
    console.log(e);
  }
};
