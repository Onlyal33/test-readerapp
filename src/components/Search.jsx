/* eslint-disable react/jsx-props-no-spreading */
import {
  FormControl, Button, Row, Col, FloatingLabel, Container,
} from 'react-bootstrap';
import { Formik, Form, useField } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import routes from '../routes';
import { addItemToSearchResults, clearSearchResults } from '../slices/searchResultsSlice';
import { changeActiveList, changeDisplayingItemType } from '../slices/uiSlice';

const handleSubmit = (dispatch) => async (values, actions) => {
  const filteredEntries = Object.entries(values).filter(([, value]) => value !== '');
  const url = routes.search(Object.fromEntries(filteredEntries));
  try {
    const { data } = await axios.get(url);
    dispatch(clearSearchResults());
    actions.setSubmitting(false);
    data.docs.forEach((item) => {
      const { key: id, author_name: author } = item;
      dispatch(addItemToSearchResults({ ...item, id, author }));
    });
    dispatch(changeDisplayingItemType('search'));
    dispatch(changeActiveList({ id: null }));
  } catch (e) {
    actions.setSubmitting(false);
    console.log(e);
    actions.setErrors(e);
  }
};

const SearchInput = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <FloatingLabel
      label={label}
    >
      <FormControl {...field} {...props} placeholder="" type="text" aria-label={label} />
    </FloatingLabel>
  );
};

// eslint-disable-next-line arrow-body-style
const Search = () => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        author: '',
        title: '',
        subject: '',
        place: '',
        person: '',
        language: '',
      }}
      onSubmit={handleSubmit(dispatch)}
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
  );
};

export default Search;
