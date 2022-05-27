import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import {
  readItemsVisibilityChanged,
  selectDisplayingItemType,
  selectSearchResultsNumber,
  selectReadItemsVisibility,
} from './uiSlice.js';

const Header = () => {
  const filteringStatus = useSelector(selectReadItemsVisibility);
  const searchResultsNumber = useSelector(selectSearchResultsNumber);
  const displayingItemType = useSelector(selectDisplayingItemType);
  const dispatch = useDispatch();

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
