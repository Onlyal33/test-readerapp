import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';

import { deleteItem } from '../../slices/itemsSlice.js';

const DeleteItem = ({ onHide, modalsState: { item } }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteItem(item));
    onHide();
  };

  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide}>
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
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="danger" type="submit" ref={modalRef}>OK</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeleteItem;
