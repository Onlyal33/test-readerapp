import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';

import useModal from '../../common/useModal.js';
import { itemAddedToList, selectListItem } from '../items/listItemSlice.js';
import { selectListsIds, selectLists } from '../lists/listsSlice.js';

const selectListsToAddItemTo = createSelector(
  [selectListsIds, selectListItem, selectLists, (__, id) => id],
  (listsIds, listItem, lists, id) => {
    const listsWithItemIds = Object.values(listItem)
      .filter(({ itemId }) => itemId === id)
      .map(({ listId }) => listId);
    const listsWithoutItemsIds = _.difference(listsIds, listsWithItemIds);
    return listsWithoutItemsIds.map((listId) => lists[listId]);
  },
);

const generateOnSubmit = ({
  hideModal, dispatch, listId, item,
}) => async (e) => {
  e.preventDefault();
  dispatch(itemAddedToList({ listId, itemId: item.id }));
  hideModal();
};

const AddItemToList = ({ item }) => {
  const lists = useSelector((state) => selectListsToAddItemTo(state, item.id));
  const [listId, setListId] = useState(lists[0].id);
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { hideModal } = useModal();

  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          Add
          {' '}
          {item.name}
          {' '}
          to List
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={generateOnSubmit({
        hideModal, dispatch, listId, item,
      })}
      >
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

export default AddItemToList;
