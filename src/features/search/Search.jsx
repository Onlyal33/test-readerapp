import {
  Button, Container, InputGroup,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import SearchInput from './SearchInput.jsx';
import useAPI from '../../common/useAPI.js';
import { toggleAdvancedSearchVisibility } from '../uiSlice.js';

const Search = () => {
  const dispatch = useDispatch();
  const searchVisibility = useSelector((state) => state.ui.searchVisibility);
  const { handleSearch } = useAPI('search');

  const toggleAdvancedSearch = (e) => {
    e.preventDefault();
    dispatch(toggleAdvancedSearchVisibility());
  };

  return searchVisibility !== 'visible' ? (
    <Formik
      initialValues={{
        all: '',
      }}
      onSubmit={handleSearch}
    >
      {({ isSubmitting }) => (
        <Form as={Container} className="flex-grow-1">
          <InputGroup>
            <SearchInput name="all" disabled={isSubmitting} />
            <Button variant="primary" type="submit" disabled={isSubmitting}>Search</Button>
            <Button onClick={toggleAdvancedSearch} variant="outline-primary">Show Advanced</Button>
          </InputGroup>
        </Form>
      )}
    </Formik>
  )
    : (
      <Button onClick={toggleAdvancedSearch} variant="outline-primary" className="ms-auto text-truncate">
        Hide Advanced Search
      </Button>
    );
};

export default Search;