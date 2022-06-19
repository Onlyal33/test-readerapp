import { Dropdown } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import useModal from '../../common/useModal.js';
import { itemAddedToLibrary, selectIsItemInLibrary } from './itemsSlice.js';
import { selectSearchItem } from '../search/searchResultsSlice.js';

const SearchItemDropdown = ({ id }) => {
  const isItemInLibrary = useSelector((state) => selectIsItemInLibrary(state, id));
  const item = useSelector((state) => selectSearchItem(state, id), shallowEqual);
  const dispatch = useDispatch();
  const { showModal } = useModal();

  const handleAdditionToLibrary = () => {
    dispatch(itemAddedToLibrary(item));
    toast.success(`${item.title} has been added to library`);
  };

  return (
    <Dropdown.Menu>
      {isItemInLibrary
        ? <Dropdown.Item onClick={() => showModal('deleteItem', item)}>Delete from Library</Dropdown.Item>
        : <Dropdown.Item onClick={handleAdditionToLibrary}>Add to Library</Dropdown.Item>}
    </Dropdown.Menu>
  );
};

export default SearchItemDropdown;
