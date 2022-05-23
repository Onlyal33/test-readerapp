import { useDispatch, useSelector } from 'react-redux';
import {
  Navbar, Button, Col,
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
      <Col className="px-2" xs={2}>
        <Navbar.Brand>Reader App</Navbar.Brand>
      </Col>
      <Col className="px-2" xs={5}>
        <Button onClick={handleClickFilter} variant="outline-primary">
          {filteringStatus === 'unread' ? 'Show All' : 'Show Unread'}
        </Button>
      </Col>
      <Col className="px-2 d-flex" xs={5}>
        <Button onClick={handleClick} variant="outline-primary" className="ms-auto">
          {searchVisibility === 'visible' ? 'Hide Search' : 'Show Search'}
        </Button>
      </Col>
    </Navbar>
  );
};
export default Header;
