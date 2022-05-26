import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';

import { addItem } from '../items/itemsSlice.js';
import useModal from '../../common/useModal.js';
import useAPI from '../../common/useAPI.js';

const generateOnSubmit = ({
  hideModal, dispatch, handleFetch, item,
}) => async (e) => {
  e.preventDefault();
  if (!item.detalised) {
    handleFetch(item.id);
  }
  dispatch(addItem(item));
  hideModal();
};

const AddItem = ({ item }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { hideModal } = useModal();
  const { handleFetch } = useAPI();
  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Item to Library</Modal.Title>
      </Modal.Header>
      <Form onSubmit={generateOnSubmit({
        hideModal, dispatch, handleFetch, item,
      })}
      >
        <Modal.Body>
          <div>
            Do you want to add
            {' '}
            {item.title}
            {' '}
            to your library?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>Cancel</Button>
          <Button variant="primary" type="submit" ref={modalRef}>OK</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddItem;
