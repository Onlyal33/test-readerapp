import {
  Container, Row, Col,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Header from '../features/Header.jsx';
import Lists from '../features/lists/Lists.jsx';
import Search from '../features/search/Search.jsx';
import Items from '../features/items/Items.jsx';
import Contents from '../features/Contents.jsx';
import SaveButton from '../features/SaveButton.jsx';

const App = () => {
  const searchVisibility = useSelector((state) => state.ui.searchVisibility);

  return (
    <Container fluid className="d-flex flex-column vh-100 p-3">
      <Header />
      <Row className="rounded shadow m-0 overflow-hidden flex-grow-1">
        <Col xs={2} className="px-2 bg-secondary bg-opacity-10">
          <SaveButton />
          <Lists />
        </Col>
        <Col xs={4} className="px-2 my-2 h-100 overflow-auto">
          <Items />
        </Col>
        <Col xs={6} className="px-2 bg-secondary bg-opacity-10 h-100 d-flex flex-column">
          {searchVisibility === 'visible' ? <Search /> : null}
          <Contents />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
