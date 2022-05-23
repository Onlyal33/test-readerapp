import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, Button, FormControl, InputGroup,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

// import getValidationSchema from '../../common/validation.js';
import { renameList } from '../../features/lists/listsSlice.js';

const getValidationSchema = (names) => yup.object().shape({
  name: yup.string()
    .trim()
    .required('validation.required')
    .notOneOf(names, 'validation.exist'),
});

const generateOnSubmit = ({ onHide, dispatch, item: { id } }) => ({ name }) => {
  dispatch(renameList({ name, id }));
  onHide();
};

const getFiletredListNames = (idToRename) => (state) => Object.values(state.entities.lists.byId)
  .filter(({ id }) => id !== idToRename)
  .map(({ name }) => name);

const Rename = ({ onHide, modalsState: { item } }) => {
  const listNames = useSelector(getFiletredListNames(item.id));
  const modalRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    modalRef.current.select();
  }, []);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Rename List</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: item.name,
        }}
        validationSchema={getValidationSchema(listNames)}
        onSubmit={generateOnSubmit({
          onHide, dispatch, item,
        })}
      >
        {({
          handleChange,
          values,
          isSubmitting,
          errors,
        }) => (
          <Form>
            <Modal.Body as={InputGroup}>
              <FormControl
                ref={modalRef}
                type="text"
                id="name"
                name="name"
                aria-label="name"
                required
                onChange={handleChange}
                value={values.name}
                isInvalid={!!errors.name}
                disabled={isSubmitting}
              />
              <FormControl.Feedback type="invalid">
                {errors.name}
              </FormControl.Feedback>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>Cancel</Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>OK</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default Rename;
