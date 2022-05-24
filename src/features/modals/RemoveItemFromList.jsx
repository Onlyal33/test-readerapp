import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';

import useModal from '../../common/useModal.js';
import { removeItemFromList } from '../items/listItemSlice.js';

const getLists = (id) => (state) => {
  const listsWithItemIds = Object.values(state.entities.listItem.byId)
    .filter(({ itemId }) => itemId === id)
    .map(({ listId }) => listId);
  const listsWithItem = listsWithItemIds
    .map((listId) => state.entities.lists.byId[listId])
    .filter(({ type }) => type !== 'default');
  return listsWithItem;
};

const RemoveItemFromList = ({ item }) => {
  const lists = useSelector(getLists(item.id));
  const [listId, setListId] = useState(lists[0].id);
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { hideModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(removeItemFromList({ listId, itemId: item.id }));
    hideModal();
  };

  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          Remove
          {' '}
          {item.title}
          {' '}
          from List
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Select
            id="listId"
            ref={modalRef}
            aria-label="select list"
            value={listId}
            onChange={(e) => setListId(e.target.value)}
          >
            {lists.map(({ id, name }) => <option value={id} key={id}>{name}</option>)}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>Cancel</Button>
          <Button variant="primary" type="submit">OK</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RemoveItemFromList;
