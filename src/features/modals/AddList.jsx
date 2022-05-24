import { useRef, useEffect } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import {
  Modal, Button, FormControl, InputGroup,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';

import useModal from '../../common/useModal.js';
import useValidation from '../../common/useValidation.js';
import { addList } from '../lists/listsSlice.js';
import { changeActiveList } from '../uiSlice.js';

const generateOnSubmit = ({ hideModal, dispatch, store }) => ({ name }) => {
  // generate list id from last id saved in state
  const { allIds } = store.getState().entities.lists;
  const lastIdChunks = allIds[allIds.length - 1].split('_');
  const lastIdNumber = Number(lastIdChunks[lastIdChunks.length - 1]);
  const id = `list_${lastIdNumber + 1}`;
  dispatch(addList({ name, id }));
  dispatch(changeActiveList({ id }));
  hideModal();
};

const getListNames = (state) => Object.values(state.entities.lists.byId).map(({ name }) => name);

const AddList = () => {
  const listNames = useSelector(getListNames);
  const modalRef = useRef();
  const dispatch = useDispatch();
  const store = useStore();
  const validationSchema = useValidation(listNames);
  const { hideModal } = useModal();
  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create List</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={validationSchema}
        onSubmit={generateOnSubmit({
          hideModal, dispatch, store,
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
              <Button variant="secondary" onClick={hideModal}>Cancel</Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>OK</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddList;
