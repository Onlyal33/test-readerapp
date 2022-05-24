import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';

import useModal from '../../common/useModal.js';
import { deleteItem } from '../items/itemsSlice.js';

const DeleteItem = ({ item }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { hideModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteItem(item));
    hideModal();
  };

  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete from library</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div>
            Do you want to delete
            {' '}
            {item.title}
            {' '}
            from your library permanently?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>Cancel</Button>
          <Button variant="danger" type="submit" ref={modalRef}>OK</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeleteItem;
