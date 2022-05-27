import { Dropdown } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import useModal from '../../common/useModal.js';
import useAPI from '../../common/useAPI.js';
import { itemAddedToLibrary, selectIsItemInLibrary } from './itemsSlice.js';
import { selectSearchItem } from '../search/searchResultsSlice.js';

const SearchItemDropdown = ({ id }) => {
  const isItemInLibrary = useSelector(selectIsItemInLibrary(id));
  const item = useSelector(selectSearchItem(id), shallowEqual);
  const {
    detalised,
  } = item;
  const dispatch = useDispatch();
  const { showModal } = useModal();
  const { handleFetch } = useAPI();

  const handleClick = async () => {
    if (!detalised) {
      await handleFetch(id);
    }
    dispatch(itemAddedToLibrary(item));
  };

  return (
    <Dropdown.Menu>
      {isItemInLibrary
        ? <Dropdown.Item onClick={() => showModal('deleteItem', item)}>Delete from Library</Dropdown.Item>
        : <Dropdown.Item onClick={handleClick}>Add to Library</Dropdown.Item>}
    </Dropdown.Menu>
  );
};

export default SearchItemDropdown;
