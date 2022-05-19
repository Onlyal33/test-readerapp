import {
  Navbar, Container, Button,
} from 'react-bootstrap';

const Header = () => (
  <Navbar bg="light" className="shadow-sm">
    <Container>
      <Navbar.Brand className="me-auto">Reader App</Navbar.Brand>
      <Button variant="outline-primary" className="ms-auto">Show Search</Button>
    </Container>
  </Navbar>
);

export default Header;
