import {
  Container, Row, Col, Navbar,
} from 'react-bootstrap';

import HeaderFilter from '../features/HeaderFilter.jsx';
import Search from '../features/search/Search.jsx';
import SaveButton from '../features/SaveButton.jsx';
import AddListButton from '../features/lists/AddListButton.jsx';
import Lists from '../features/lists/Lists.jsx';
import Items from '../features/items/Items.jsx';
import AdvancedSearch from '../features/search/AdvancedSearch.jsx';
import Contents from '../features/Contents.jsx';
import ModalFactory from '../features/modals/ModalFactory.jsx';

const App = () => (
  <Container fluid className="d-flex flex-column vh-100 p-3">
    <Navbar bg="light" className="shadow-sm">
      <Col className="px-2" xs={2}>
        <Navbar.Brand>Reader App</Navbar.Brand>
      </Col>
      <Col className="px-2" xs={4}>
        <HeaderFilter />
      </Col>
      <Col className="px-2 d-flex" xs={6}>
        <Search />
      </Col>
    </Navbar>
    <Row className="rounded shadow m-0 overflow-hidden flex-grow-1">
      <Col xs={2} className="px-2 bg-secondary bg-opacity-10">
        <SaveButton />
        <AddListButton />
        <Lists />
      </Col>
      <Col xs={4} className="px-2 my-2 h-100 overflow-auto">
        <Items />
      </Col>
      <Col xs={6} className="px-2 bg-secondary bg-opacity-10 h-100 d-flex flex-column">
        <AdvancedSearch />
        <Contents />
      </Col>
    </Row>
    <ModalFactory />
  </Container>
);

export default App;
