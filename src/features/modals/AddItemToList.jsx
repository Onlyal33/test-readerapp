import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { toast } from 'react-toastify';

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
  hideModal, dispatch, list, item,
}) => async (e) => {
  e.preventDefault();
  dispatch(itemAddedToList({ listId: list.id, itemId: item.id }));
  hideModal();
  toast.success(`${item.title} has been added to list ${list.name}`);
};

const AddItemToList = ({ item }) => {
  const lists = useSelector((state) => selectListsToAddItemTo(state, item.id));
  const [list, setList] = useState(lists[0]);
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
        hideModal, dispatch, list, item,
      })}
      >
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

export default AddItemToList;
