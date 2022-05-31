import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { createSelector } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import useModal from '../../common/useModal.js';
import { itemRemovedFromList, selectListItem } from '../items/listItemSlice.js';
import { selectLists } from '../lists/listsSlice.js';

const selectListsToRemoveItemFrom = createSelector(
  [selectLists, selectListItem, (_, id) => id],
  (lists, listItem, id) => Object.values(listItem)
    .filter(({ itemId }) => itemId === id)
    .map(({ listId }) => lists[listId]),
);

const RemoveItemFromList = ({ item }) => {
  const lists = useSelector((state) => selectListsToRemoveItemFrom(state, item.id));
  const [list, setList] = useState(lists[0]);
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { hideModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(itemRemovedFromList({ listId: list.id, itemId: item.id }));
    hideModal();
    toast.success(`${item.title} has been removed from list ${list.name}`);
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
            value={list}
            onChange={(e) => setList(e.target.value)}
          >
            {lists.map((el) => <option value={el} key={el.id}>{el.name}</option>)}
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
