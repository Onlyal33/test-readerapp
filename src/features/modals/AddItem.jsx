import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';

import { addItem } from '../items/itemsSlice.js';
import { addItemToList } from '../items/listItemSlice.js';
import useModal from '../../common/useModal.js';
import useAPI from '../../common/useAPI.js';

const selectDefaultListId = (state) => state.entities.lists.byId[state.entities.lists.allIds[0]].id;

const generateOnSubmit = ({
  hideModal, dispatch, handleFetch, listId, item,
}) => async (e) => {
  e.preventDefault();
  if (!item.detalised) {
    handleFetch(item.id);
  }
  dispatch(addItem(item));
  dispatch(addItemToList({ itemId: item.id, listId }));
  hideModal();
};

const AddItem = ({ item }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const listId = useSelector(selectDefaultListId);
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
        hideModal, dispatch, handleFetch, listId, item,
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
