import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
  Modal, Button, FormControl, InputGroup,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';

import useModal from '../../common/useModal.js';
import getValidationSchema from '../../common/validationSchema.js';
import { listRenamed, selectLists, selectListsIds } from '../lists/listsSlice.js';

const generateOnSubmit = ({ hideModal, dispatch, item: { id } }) => ({ name }) => {
  dispatch(listRenamed({ name, id }));
  hideModal();
};

const selectListNamesExceptCurrent = createSelector(
  [selectLists, selectListsIds, (_, id) => id],
  (lists, listsIds, id) => listsIds
    .filter((list) => id !== list.id)
    .map((listId) => (lists[listId].name)),
);

const RenameList = ({ item }) => {
  const listNames = useSelector((state) => selectListNamesExceptCurrent(state, item.id));
  const modalRef = useRef();
  const dispatch = useDispatch();
  const validationSchema = getValidationSchema(listNames);
  const { hideModal } = useModal();
  useEffect(() => {
    modalRef.current.select();
  }, []);

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Rename List</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: item.name,
        }}
        validationSchema={validationSchema}
        onSubmit={generateOnSubmit({
          hideModal, dispatch, item,
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

export default RenameList;
