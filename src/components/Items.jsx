import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Item from './Item.jsx';

const getItemsIds = (state) => {
  const itemsIds = Object.values(state.entities.listItem.byId)
    .filter(({ listId }) => listId === state.ui.activeList)
    .map(({ itemId }) => itemId);
  return state.ui.filteringStatus === 'all'
    ? itemsIds
    : itemsIds.filter((id) => !state.entities.items.byId[id].isRead);
};

const Items = () => {
  const itemsIds = useSelector(getItemsIds);

  if (itemsIds.length === 0) {
    return null;
  }

  return (
    <ListGroup variant="flush" className="w-100 my-2">
      {itemsIds.map((id) => <Item key={id} id={id} />)}
    </ListGroup>
  );
};

export default Items;
