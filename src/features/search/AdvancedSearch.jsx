import { useRef } from 'react';
import {
  Row, Col, Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import SearchInput from './SearchInput.jsx';
import { selectIsAdvancedSearchVisible } from '../uiSlice.js';
import { fetchSearchResults } from './searchResultsSlice.js';
import SearchButton from './SearchButton.jsx';

const AdvancedSearch = () => {
  const searchVisibility = useSelector(selectIsAdvancedSearchVisible);
  const dispatch = useDispatch();
  const searchRef = useRef();

  return searchVisibility === 'visible' && (
    <Formik
      initialValues={{
        author: '',
        title: '',
        subject: '',
        place: '',
        person: '',
        language: '',
      }}
      onSubmit={(values, actions) => dispatch(fetchSearchResults({ values, actions, searchRef }))}
    >
      {({ isSubmitting }) => (
        <Form as={Container} className="my-2">
          <Row className="mb-2">
            <Col className="pe-1">
              <SearchInput ref={searchRef} name="title" label="Title" disabled={isSubmitting} />
            </Col>
            <Col className="ps-1">
              <SearchInput name="author" label="Author" disabled={isSubmitting} />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col className="pe-1">
              <SearchInput name="subject" label="Subject" disabled={isSubmitting} />
            </Col>
            <Col className="ps-1">
              <SearchInput name="place" label="Place" disabled={isSubmitting} />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col className="pe-1">
              <SearchInput name="person" label="Person" disabled={isSubmitting} />
            </Col>
            <Col className="ps-1">
              <SearchInput name="language" label="Language" disabled={isSubmitting} />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <SearchButton disabled={isSubmitting} />
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default AdvancedSearch;
