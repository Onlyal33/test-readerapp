import {
  Button, ButtonGroup, Card, Dropdown, ListGroup,
} from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { selectLibraryItem } from './itemsSlice.js';
import { activeItemChanged, selectIsItemActive } from '../uiSlice.js';
import LibraryItemDropdown from './LibraryItemDropdown.jsx';
import SearchItemDropdown from './SearchitemDropdown.jsx';
import useAPI from '../../common/useAPI.js';
import { selectSearchItem } from '../search/searchResultsSlice.js';

const dropdowns = {
  library: LibraryItemDropdown,
  search: SearchItemDropdown,
};

const selectors = {
  library: selectLibraryItem,
  search: selectSearchItem,
};

const getDropdown = (type) => dropdowns[type];

const getItemSelector = (type) => selectors[type];

const selectItem = (type, id) => getItemSelector(type)(id);

const Item = ({ type, id }) => {
  const Component = getDropdown(type);

  const isItemActive = useSelector(selectIsItemActive(id));
  const item = useSelector(selectItem(type, id), shallowEqual);
  const {
    title, author, firstPublishYear, detalised,
  } = item;

  const dispatch = useDispatch();
  const { handleFetch } = useAPI();

  const handleSelectItem = async () => {
    if (type === 'search' && !detalised) {
      await handleFetch(id);
    }
    dispatch(activeItemChanged({ id }));
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
        <Component id={id} />
      </Dropdown>
    </ListGroup.Item>
  );
};

export default Item;
