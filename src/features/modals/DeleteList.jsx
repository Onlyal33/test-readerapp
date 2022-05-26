import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';

import useModal from '../../common/useModal.js';
import { listDeleted } from '../lists/listsSlice.js';

const generateOnSubmit = ({ hideModal, dispatch, item }) => (e) => {
  e.preventDefault();
  dispatch(listDeleted(item));
  hideModal();
};

const DeleteList = ({ item }) => {
  const { name } = item;
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { hideModal } = useModal();
  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Do you want to delete your list
          {' '}
          {name}
          ?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>Cancel</Button>
        <Form
          onSubmit={generateOnSubmit({
            dispatch, hideModal, item,
          })}
        >
          <Form.Control
            as={Button}
            variant="danger"
            type="submit"
            ref={modalRef}
          >
            OK
          </Form.Control>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteList;
