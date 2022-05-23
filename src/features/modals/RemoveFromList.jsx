import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';

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

const RemoveFromList = ({ onHide, modalsState: { item } }) => {
  const lists = useSelector(getLists(item.id));
  const [state, setState] = useState({ listId: lists[0].id, itemId: item.id });
  const modalRef = useRef();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setState({ ...state, listId: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(removeItemFromList(state));
    onHide();
  };

  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide}>
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
            value={state.id}
            onChange={handleChange}
          >
            {lists.map(({ id, name }) => <option value={id} key={id}>{name}</option>)}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">OK</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RemoveFromList;
