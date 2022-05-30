import {
  Button, Spinner,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { selectSearchStatus } from '../uiSlice.js';

const SearchButton = ({ disabled }) => {
  const searchStatus = useSelector(selectSearchStatus);

  return (
    <Button variant="primary" type="submit" disabled={disabled}>
      {searchStatus === 'loading'
        ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </>
        )
        : 'Search'}
    </Button>
  );
};

export default SearchButton;
