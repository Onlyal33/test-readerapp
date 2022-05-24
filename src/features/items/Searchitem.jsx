import {
  Button, ButtonGroup, Card, Dropdown, ListGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import useModal from '../../common/useModal.js';
import useAPI from '../../common/useAPI.js';
import { changeActiveItem } from '../uiSlice.js';

const SearchItem = ({ id }) => {
  const isItemInLibrary = useSelector((state) => state.entities.items.allIds.includes(id));
  const isItemDetalised = useSelector(
    (state) => state.entities.searchResults.byId[id].detalised,
  );
  const isItemActive = useSelector((state) => state.ui.activeItem === id);
  const item = useSelector((state) => state.entities.searchResults.byId[id]);
  const {
    title, author, firstPublishYear,
  } = item;
  const dispatch = useDispatch();
  const { showModal } = useModal();
  const { handleFetch } = useAPI();

  const handleSelectItem = async () => {
    if (!isItemDetalised) {
      await handleFetch(id);
    }
    dispatch(changeActiveItem({ id }));
  };

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
          {isItemInLibrary
            ? <Dropdown.Item onClick={() => showModal('deleteItem', item)}>Delete from Library</Dropdown.Item>
            : <Dropdown.Item onClick={() => showModal('addItem', item)}>Add to Library</Dropdown.Item>}
        </Dropdown.Menu>
      </Dropdown>
    </ListGroup.Item>
  );
};

export default SearchItem;
