import {
  Button, Container, InputGroup,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

import SearchInput from './SearchInput.jsx';
import SearchButton from './SearchButton.jsx';
import { fetchSearchResults } from './searchResultsSlice.js';
import { advancedSearchVisibilityChanged, selectIsAdvancedSearchVisible } from '../uiSlice.js';

const Search = () => {
  const searchVisibility = useSelector(selectIsAdvancedSearchVisible);
  const dispatch = useDispatch();
  const searchRef = useRef();

  const handleTogglingAdvancedSearchVisibility = (e) => {
    e.preventDefault();
    dispatch(advancedSearchVisibilityChanged());
  };

  return searchVisibility !== 'visible' ? (
    <Formik
      initialValues={{
        q: '',
      }}
      onSubmit={(values, actions) => dispatch(fetchSearchResults({ values, actions }))}
    >
      {({ isSubmitting }) => (
        <Form as={Container} className="flex-grow-1">
          <InputGroup>
            <SearchInput name="q" disabled={isSubmitting} ref={searchRef} />
            <SearchButton disabled={isSubmitting} />
            <Button onClick={handleTogglingAdvancedSearchVisibility} variant="outline-primary">Show Advanced</Button>
          </InputGroup>
        </Form>
      )}
    </Formik>
  )
    : (
      <Button onClick={handleTogglingAdvancedSearchVisibility} variant="outline-primary" className="ms-auto text-truncate">
        Hide Advanced Search
      </Button>
    );
};

export default Search;
