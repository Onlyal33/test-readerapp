import { useDispatch, useSelector } from 'react-redux';
import {
  Navbar, Container, Button,
} from 'react-bootstrap';

import { toggleSearchVisibility, toggleFilter } from '../slices/uiSlice';

const Header = () => {
  const dispatch = useDispatch();
  const searchVisibility = useSelector((state) => state.ui.searchVisibility);
  const filteringStatus = useSelector((state) => state.ui.filteringStatus);
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(toggleSearchVisibility());
  };
  const handleClickFilter = (e) => {
    e.preventDefault();
    dispatch(toggleFilter());
  };
  return (
    <Navbar bg="light" className="shadow-sm">
      <Container>
        <Navbar.Brand className="me-auto">Reader App</Navbar.Brand>
        <Button onClick={handleClickFilter} variant="outline-primary">
          Show
          {' '}
          {filteringStatus === 'unread' ? 'All' : 'Unread'}
        </Button>
        <Button onClick={handleClick} variant="outline-primary" className="ms-auto">
          {searchVisibility === 'visible' ? 'Hide' : 'Show'}
          {' '}
          Search
        </Button>
      </Container>
    </Navbar>
  );
};
export default Header;
