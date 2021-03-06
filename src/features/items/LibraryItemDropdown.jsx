import { Dropdown } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { readStatusToggled, selectLibraryItem } from './itemsSlice.js';
import useModal from '../../common/useModal.js';
import { selectListsIds } from '../lists/listsSlice.js';
import { selectListItem } from './listItemSlice.js';

const makeSelectHasListsToAddItemTo = () => createSelector(
  [selectListsIds, selectListItem, (_, id) => id],
  (listsIds, listItem, id) => {
    const listsWithItem = Object.values(listItem).filter(({ itemId }) => itemId === id);
    return listsIds.length > listsWithItem.length;
  },
);

const makeSelectHasListsToRemoveItemFrom = () => createSelector(
  [selectListItem, (_, id) => id],
  (listItem, id) => {
    const listItemWithItem = Object.values(listItem)
      .filter(({ itemId }) => itemId === id);
    return listItemWithItem.length > 0;
  },
);

const LibraryItemDropdown = ({ id }) => {
  const selectHasListsToAddItemTo = useMemo(makeSelectHasListsToAddItemTo, []);
  const selectHasListsToRemoveItemFrom = useMemo(makeSelectHasListsToRemoveItemFrom, []);
  const hasListsToAddItemTo = useSelector((state) => selectHasListsToAddItemTo(state, id));
  const hasListsToRemoveItemFrom = useSelector(
    (state) => selectHasListsToRemoveItemFrom(state, id),
  );
  const item = useSelector((state) => selectLibraryItem(state, id), shallowEqual);

  const dispatch = useDispatch();
  const { showModal } = useModal();
  const handleTogglingReadStatus = () => {
    dispatch(readStatusToggled({ id }));
    toast.success(`${item.title} has been marked as ${item.isRead ? 'not read' : 'read'}`);
  };

  return (
    <Dropdown.Menu>
      {hasListsToAddItemTo && <Dropdown.Item onClick={() => showModal('addItemToList', item)}>Add to List</Dropdown.Item>}
      {hasListsToRemoveItemFrom && <Dropdown.Item onClick={() => showModal('removeItemFromList', item)}>Remove from List</Dropdown.Item>}
      <Dropdown.Item onClick={handleTogglingReadStatus}>
        Mark as
        {' '}
        {item.isRead ? 'Unread' : 'Read'}
      </Dropdown.Item>
      <Dropdown.Item onClick={() => showModal('editNotes', item)}>Edit Notes</Dropdown.Item>
      <Dropdown.Item onClick={() => showModal('deleteItem', item)}>Delete from Library</Dropdown.Item>
    </Dropdown.Menu>
  );
};

export default LibraryItemDropdown;
