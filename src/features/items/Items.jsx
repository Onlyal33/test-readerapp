import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Item from './Item.jsx';

const selectItemsIds = (itemType) => (state) => {
  if (itemType === 'library') {
    const itemsIds = Object.values(state.entities.listItem.byId)
      .filter(({ listId }) => listId === state.ui.activeList)
      .map(({ itemId }) => itemId);
    return state.ui.filteringStatus === 'all'
      ? itemsIds
      : itemsIds.filter((id) => !state.entities.items.byId[id].isRead);
  }

  return state.entities.searchResults.allIds;
};

const Items = () => {
  const itemType = useSelector((state) => state.ui.displayingItemType);
  const itemsIds = useSelector(selectItemsIds(itemType));

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
