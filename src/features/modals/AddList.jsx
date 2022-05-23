import { useRef, useEffect } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import {
  Modal, Button, FormControl, InputGroup,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

// import getValidationSchema from '../../common/validation.js';
import { addList } from '../lists/listsSlice.js';
import { changeActiveList } from '../uiSlice.js';

const getValidationSchema = (names) => yup.object().shape({
  name: yup.string()
    .trim()
    .required('validation.required')
    .notOneOf(names, 'validation.exist'),
});

const generateOnSubmit = ({ onHide, dispatch, store }) => ({ name }) => {
  // generate list id from last id saved in state
  const { allIds } = store.getState().entities.lists;
  const lastIdChunks = allIds[allIds.length - 1].split('_');
  const lastIdNumber = Number(lastIdChunks[lastIdChunks.length - 1]);
  const id = `list_${lastIdNumber + 1}`;
  dispatch(addList({ name, id }));
  dispatch(changeActiveList({ id }));
  onHide();
};

const getListNames = (state) => Object.values(state.entities.lists.byId).map(({ name }) => name);

const Add = ({ onHide }) => {
  const listNames = useSelector(getListNames);
  const modalRef = useRef();
  const dispatch = useDispatch();
  const store = useStore();
  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create List</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={getValidationSchema(listNames)}
        onSubmit={generateOnSubmit({
          onHide, dispatch, store,
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

export default Add;
