import {
  Container, Row, Col,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Header from './components/Header.jsx';
import Lists from './components/Lists.jsx';
import Search from './components/Search.jsx';
import Items from './components/Items.jsx';
import Contents from './components/Contents.jsx';

const App = () => {
  const searchVisibility = useSelector((state) => state.ui.searchVisibility);

  return (
    <Container className="h-100 p-3">
      <Header />
      <Row className="rounded shadow h-100 m-0">
        <Col xs={2} className="bg-secondary bg-opacity-10">
          <Lists />
        </Col>
        <Col xs={5} className="">
          <Items />
        </Col>
        <Col xs={5} className="py-0 h-100">
          {searchVisibility === 'visible' ? <Search /> : null}
          <Contents />
        </Col>
      </Row>
    </Container>
    /* <div className="h-100">
      <div className="d-flex flex-column h-100">
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand>Reader App</Navbar.Brand>
          </Container>
        </Navbar>
        <Lists />
        <Search />
        <Items />
        <Contents />
      </div>
    </div> */
  );
};

export default App;
