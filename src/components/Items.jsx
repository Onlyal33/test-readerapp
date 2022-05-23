import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Item from './Item.jsx';
import SearchItem from './Searchitem.jsx';

const getItemsIds = (state) => {
  const itemsIds = Object.values(state.entities.listItem.byId)
    .filter(({ listId }) => listId === state.ui.activeList)
    .map(({ itemId }) => itemId);
  return state.ui.filteringStatus === 'all'
    ? itemsIds
    : itemsIds.filter((id) => !state.entities.items.byId[id].isRead);
};

const Items = () => {
  const itemType = useSelector((state) => state.ui.displayingItemType);

  if (itemType === 'library') {
    const itemsIds = useSelector(getItemsIds);

    if (itemsIds.length === 0) {
      return null;
    }

    return (
      <ListGroup variant="flush">
        {itemsIds.map((id) => <Item key={id} id={id} />)}
      </ListGroup>
    );
  }

  const items = useSelector((state) => Object.values(state.entities.searchResults.byId));

  return (
    <ListGroup variant="flush">
      {items.map((item) => <SearchItem key={item.id} item={item} />)}
    </ListGroup>
  );
};

export default Items;
