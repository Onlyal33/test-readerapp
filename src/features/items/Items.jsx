import { ListGroup } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';

import { createSelector } from '@reduxjs/toolkit';
import Item from './Item.jsx';
import { selectDisplayingItemType, selectActiveListId, selectReadItemsVisibility } from '../uiSlice.js';
import { selectSearchItemsIds } from '../search/searchResultsSlice.js';
import { selectLibraryItemsIds, selectLibraryItems } from './itemsSlice.js';

const selectListItem = (state) => state.entities.listItem.byId;

const selectLibraryItemsIdsByList = createSelector(
  [selectActiveListId, selectLibraryItemsIds, selectListItem],
  (activeListId, libraryListItemsIds, listItem) => (activeListId === null
    ? libraryListItemsIds
    : Object.values(listItem)
      .filter(({ listId }) => listId === activeListId)
      .map(({ itemId }) => itemId)),
);

const selectLibraryItemsIdsByListFiltered = createSelector(
  [selectLibraryItemsIdsByList, selectLibraryItems, selectReadItemsVisibility],
  (libraryItemsIdsByList, libraryItems, readItemsVisibility) => (readItemsVisibility === 'all'
    ? libraryItemsIdsByList
    : libraryItemsIdsByList.filter((id) => !libraryItems[id].isRead)),
);

const selectItemsIds = createSelector(
  [selectLibraryItemsIdsByListFiltered, selectSearchItemsIds, (_, itemType) => itemType],
  (libraryItemsIds, searchItemsIds, itemType) => (itemType === 'search' ? searchItemsIds : libraryItemsIds),
);

const Items = () => {
  const itemType = useSelector(selectDisplayingItemType);
  const itemsIds = useSelector((state) => selectItemsIds(state, itemType), shallowEqual);

  if (itemsIds.length === 0) {
    return null;
  }

  return (
    <ListGroup variant="flush">
      {itemsIds.map((id) => <Item type={itemType} key={id} id={id} />)}
    </ListGroup>
  );
};

export default Items;
