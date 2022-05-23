import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import _ from 'lodash';

import { addItemToList } from '../items/listItemSlice.js';

const getLists = (id) => (state) => {
  const listsIds = state.entities.lists.allIds;
  const listsWithItemIds = Object.values(state.entities.listItem.byId)
    .filter(({ itemId }) => itemId === id)
    .map(({ listId }) => listId);
  const listsWithoutItemsIds = _.difference(listsIds, listsWithItemIds);
  return listsWithoutItemsIds.map((listId) => state.entities.lists.byId[listId]);
};

const AddToList = ({ onHide, modalsState: { item } }) => {
  const lists = useSelector(getLists(item.id));
  const [state, setState] = useState({ listId: lists[0].id, itemId: item.id });
  const modalRef = useRef();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setState({ ...state, listId: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addItemToList({ ...state, id: `${state.listId}_${state.itemId}` }));
    onHide();
  };

  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Add
          {' '}
          {item.name}
          {' '}
          to List
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

export default AddToList;
