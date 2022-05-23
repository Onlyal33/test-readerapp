import {
  Button, ButtonGroup, Card, Dropdown, ListGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleReadStatus } from '../slices/itemsSlice.js';
import { changeActiveItem, openModal } from '../slices/uiSlice.js';

const hasListsToAddTo = (id) => (state) => {
  const listsIds = state.entities.lists.allIds;
  const listsWithItem = Object.values(state.entities.listItem.byId)
    .filter(({ itemId }) => itemId === id);
  return listsIds.length > listsWithItem.length;
};

const hasListsToRemoveFrom = (id) => (state) => {
  const listsWithItem = Object.values(state.entities.listItem.byId)
    .filter(({ itemId, listId }) => itemId === id && state.entities.lists.byId[listId].type !== 'default');
  return listsWithItem.length > 0;
};

const Item = ({ id: itemId }) => {
  const item = useSelector((state) => state.entities.items.byId[itemId]);
  const isAddItemToListAvaliable = useSelector(hasListsToAddTo(itemId));
  const isRemoveItemFromListAvaliable = useSelector(hasListsToRemoveFrom(itemId));
  const {
    title, author, description,
  } = item;

  const activeItemId = useSelector((state) => state.ui.activeItem);
  const dispatch = useDispatch();
  const handleSelectItem = (id) => () => {
    dispatch(changeActiveItem({ id }));
  };
  const toggleRead = (id) => dispatch(toggleReadStatus({ id }));
  const showModal = (type) => dispatch(openModal({ type, item }));

  const variant = itemId === activeItemId ? 'primary' : null;

  return (
    <ListGroup.Item className="rounded-1 w-100 p-0">
      <Dropdown as={ButtonGroup} className="rounded-1 d-flex">
        <Button onClick={handleSelectItem(itemId)} variant={variant} className="w-100 text-truncate">
          <Card.Title className="text-start text-truncate">{title}</Card.Title>
          <Card.Subtitle className="text-start text-truncate">{author?.join(', ')}</Card.Subtitle>
          <Card.Text className="text-start text-truncate">{description}</Card.Text>
        </Button>
        <Dropdown.Toggle split variant={variant} />
        <Dropdown.Menu>
          {isAddItemToListAvaliable ? <Dropdown.Item onClick={() => showModal('addToList', item)}>Add to List</Dropdown.Item> : null}
          {isRemoveItemFromListAvaliable ? <Dropdown.Item onClick={() => showModal('removeFromList', item)}>Remove from List</Dropdown.Item> : null}
          <Dropdown.Item onClick={() => toggleRead(itemId)}>
            Mark as
            {' '}
            {item.isRead ? 'Unread' : 'Read'}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => showModal('editNotes', item)}>Edit Notes</Dropdown.Item>
          <Dropdown.Item onClick={() => showModal('deleteItem', item)}>Delete from Library</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ListGroup.Item>
  );
};

export default Item;
