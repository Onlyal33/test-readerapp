import {
  Button, ButtonGroup, Card, Dropdown, ListGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import routes from '../routes.js';
import { changeActiveItem, openModal } from '../slices/uiSlice.js';
import { updateItemInSearchResults } from '../slices/searchResultsSlice.js';

const SearchItem = ({ item }) => {
  const { id: itemId } = item;
  const isItemInLibrary = useSelector((state) => state.entities.items.allIds.includes(itemId));
  const isItemDetalised = useSelector(
    (state) => state.entities.searchResults.byId[itemId].detalised,
  );
  const {
    title, author, firstPublishYear,
  } = item;

  const activeItemId = useSelector((state) => state.ui.activeItem);
  const dispatch = useDispatch();
  const handleSelectItem = (id) => async () => {
    if (!isItemDetalised) {
      const url = routes.fetchBook(id);
      try {
        const { data } = await axios.get(url);
        dispatch(updateItemInSearchResults({
          id: item.id,
          description: data.description?.value ?? data.description,
        }));
      } catch (e) {
        console.log(e);
      }
    }
    dispatch(changeActiveItem({ id }));
  };
  const showModal = (type) => dispatch(openModal({ type, item }));

  const variant = itemId === activeItemId ? 'primary' : null;

  return (
    <ListGroup.Item className="rounded-1 w-100 p-0">
      <Dropdown as={ButtonGroup} className="rounded-1 d-flex">
        <Button onClick={handleSelectItem(itemId)} variant={variant} className="w-100 text-truncate">
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
          {isItemInLibrary
            ? <Dropdown.Item onClick={() => showModal('deleteItem', item)}>Delete from Library</Dropdown.Item>
            : <Dropdown.Item onClick={() => showModal('addItem', item)}>Add to Library</Dropdown.Item>}
        </Dropdown.Menu>
      </Dropdown>
    </ListGroup.Item>
  );
};

export default SearchItem;
