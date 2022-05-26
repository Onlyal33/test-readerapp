import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import { readItemsVisibilityChanged } from './uiSlice.js';

const Header = () => {
  const dispatch = useDispatch();
  const filteringStatus = useSelector((state) => state.ui.filteringStatus);
  const searchResultsNumber = useSelector((state) => state.ui.searchResultsNumber);
  const displayingItemType = useSelector((state) => state.ui.displayingItemType);

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(readItemsVisibilityChanged());
  };
  return displayingItemType === 'library'
    ? (
      <Button onClick={handleFilter} variant="outline-primary">
        {filteringStatus === 'unread' ? 'Show All' : 'Show Unread'}
      </Button>
    )
    : (
      <div className="border-b">
        {searchResultsNumber}
        {' '}
        items found
      </div>
    );
};
export default Header;
