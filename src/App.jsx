import {
  Container, Row, Col,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Header from './components/Header.jsx';
import Lists from './components/Lists.jsx';
import Search from './components/Search.jsx';
import Items from './components/Items.jsx';
import Contents from './components/Contents.jsx';
import SaveButton from './components/SaveButton.jsx';

const App = () => {
  const searchVisibility = useSelector((state) => state.ui.searchVisibility);

  return (
    <Container className="d-flex flex-column vh-100 p-3">
      <Header />
      <Row className="rounded shadow m-0 overflow-hidden flex-grow-1">
        <Col xs={2} className="px-2 bg-secondary bg-opacity-10">
          <SaveButton />
          <Lists />
        </Col>
        <Col xs={5} className="px-2 my-2 h-100 overflow-auto">
          <Items />
        </Col>
        <Col xs={5} className="px-2 bg-secondary bg-opacity-10 h-100 d-flex flex-column">
          {searchVisibility === 'visible' ? <Search /> : null}
          <Contents />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
