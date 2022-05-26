import axios from 'axios';
import { useDispatch } from 'react-redux';

import routes from './routes.js';
import { addItemToSearchResults, clearSearchResults, updateItemInSearchResults } from '../features/search/searchResultsSlice.js';
import { searchCompleted } from '../features/uiSlice.js';

export default (searchType) => {
  const dispatch = useDispatch();

  const handleSearch = async (values, actions) => {
    const filteredEntries = Object.entries(values).filter(([, value]) => value !== '');
    const url = routes[searchType](Object.fromEntries(filteredEntries));
    try {
      const { data } = await axios.get(url);
      dispatch(clearSearchResults());
      actions.setSubmitting(false);
      const languageNames = new Intl.DisplayNames(['en'], {
        type: 'language',
      });
      data.docs.forEach((item) => {
        const {
          key: id,
          author_name: author,
          first_publish_year: firstPublishYear,
          language = [],
          place = [],
          subject = [],
          title,
        } = item;
        dispatch(addItemToSearchResults({
          id,
          author,
          firstPublishYear,
          language: language.map((el) => languageNames.of(el)),
          place,
          subject,
          title,
        }));
      });
      dispatch(searchCompleted({ searchResultsNumber: data.numFound, displayingItemType: 'search' }));
    } catch (e) {
      actions.setSubmitting(false);
      console.log(e);
      actions.setErrors(e);
    }
  };

  const handleFetch = async (id) => {
    const url = routes.fetchBook(id);
    try {
      const { data } = await axios.get(url);
      dispatch(updateItemInSearchResults({
        id,
        description: data.description?.value ?? data.description,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  return { handleSearch, handleFetch };
};
