import {
  Button, ButtonGroup, Card, Dropdown, ListGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { readStatusToggled } from './itemsSlice.js';
import { activeItemChanged } from '../uiSlice.js';
import useModal from '../../common/useModal.js';

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

const LibraryItem = ({ id }) => {
  const isAddItemToListAvaliable = useSelector(hasListsToAddTo(id));
  const isRemoveItemFromListAvaliable = useSelector(hasListsToRemoveFrom(id));
  const isItemActive = useSelector((state) => state.ui.activeItem === id);
  const item = useSelector((state) => state.entities.items.byId[id]);
  const {
    title, author, firstPublishYear,
  } = item;

  const dispatch = useDispatch();
  const { showModal } = useModal();
  const handleSelectItem = () => dispatch(activeItemChanged({ id }));
  const toggleRead = () => dispatch(readStatusToggled({ id }));

  const variant = isItemActive ? 'primary' : null;

  return (
    <ListGroup.Item className="rounded-1 w-100 p-0">
      <Dropdown as={ButtonGroup} className="rounded-1 d-flex">
        <Button onClick={handleSelectItem} variant={variant} className="w-100 text-truncate">
          <Card.Title aria-label="title" className="text-start text-truncate">{title}</Card.Title>
          <Card.Subtitle aria-label="author" className="text-start text-truncate">
            by
            {' '}
            {author?.join(', ')}
          </Card.Subtitle>
          <Card.Text aria-label="year" className="text-start text-truncate fst-italic">{firstPublishYear}</Card.Text>
        </Button>
        <Dropdown.Toggle split variant={variant} />
        <Dropdown.Menu>
          {isAddItemToListAvaliable ? <Dropdown.Item onClick={() => showModal('addToList', item)}>Add to List</Dropdown.Item> : null}
          {isRemoveItemFromListAvaliable ? <Dropdown.Item onClick={() => showModal('removeFromList', item)}>Remove from List</Dropdown.Item> : null}
          <Dropdown.Item onClick={toggleRead}>
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

export default LibraryItem;
