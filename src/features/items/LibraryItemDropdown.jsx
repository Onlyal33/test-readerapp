import { Dropdown } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';

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
  const item = useSelector(selectLibraryItem(id), shallowEqual);

  const dispatch = useDispatch();
  const { showModal } = useModal();
  const toggleRead = () => dispatch(readStatusToggled({ id }));

  return (
    <Dropdown.Menu>
      {hasListsToAddItemTo ? <Dropdown.Item onClick={() => showModal('addItemToList', item)}>Add to List</Dropdown.Item> : null}
      {hasListsToRemoveItemFrom ? <Dropdown.Item onClick={() => showModal('removeItemFromList', item)}>Remove from List</Dropdown.Item> : null}
      <Dropdown.Item onClick={toggleRead}>
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
