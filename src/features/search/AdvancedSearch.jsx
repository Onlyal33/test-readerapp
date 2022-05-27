import {
  Button, Row, Col, Container,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import SearchInput from './SearchInput.jsx';
import useAPI from '../../common/useAPI.js';
import { selectIsAdvancedSearchVisible } from '../uiSlice.js';

const AdvancedSearch = () => {
  const searchVisibility = useSelector(selectIsAdvancedSearchVisible);
  const { handleSearch } = useAPI({ searchType: 'advancedSearch' });

  return searchVisibility === 'visible' ? (
    <Formik
      initialValues={{
        author: '',
        title: '',
        subject: '',
        place: '',
        person: '',
        language: '',
      }}
      onSubmit={handleSearch}
    >
      {({ isSubmitting }) => (
        <Form as={Container} className="my-2">
          <Row className="mb-2">
            <Col className="pe-1">
              <SearchInput name="author" label="Author" disabled={isSubmitting} />
            </Col>
            <Col className="ps-1">
              <SearchInput name="title" label="Title" disabled={isSubmitting} />
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
              <Button variant="primary" type="submit" disabled={isSubmitting}>Search</Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  ) : null;
};

export default AdvancedSearch;
