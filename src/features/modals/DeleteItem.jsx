import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import useModal from '../../common/useModal.js';
import { itemRemovedFromLibrary } from '../items/itemsSlice.js';

const DeleteItem = ({ item }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { hideModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(itemRemovedFromLibrary(item));
    hideModal();
    toast.success(`${item.title} has been deleted from your library`);
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
