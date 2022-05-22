import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';

import { addItem } from '../../slices/itemsSlice.js';
import { addItemToList } from '../../slices/listItemSlice.js';

const getDefaultListId = (state) => state.enities.lists.byId[state.entities.lists.allIds[0]].id;

const AddItem = ({ onHide, modalsState: { item } }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const listId = useSelector(getDefaultListId);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem(item));
    dispatch(addItemToList({ itemId: item.id, listId, id: `${listId}_${item.Id}` }));
    onHide();
  };

  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Item to Library</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
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
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit" ref={modalRef}>OK</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddItem;
