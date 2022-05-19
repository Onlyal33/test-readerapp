import {
  Form, Button, Row, Col, ButtonGroup, ButtonToolbar,
} from 'react-bootstrap';
// eslint-disable-next-line arrow-body-style
const Search = () => {
  return (
    <Form className="my-2">
      <Row className="mb-2">
        <Col>
          <Form.Control placeholder="Author" />
        </Col>
        <Col>
          <Form.Control placeholder="Title" />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control placeholder="Subject" />
        </Col>
        <Col>
          <Form.Control placeholder="Place" />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control placeholder="Person" />
        </Col>
        <Col>
          <Form.Control placeholder="Language" />
        </Col>
      </Row>
      <ButtonToolbar className="justify-content-between">
        <ButtonGroup className="me-2">
          <Button variant="primary" type="submit">Search</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline-danger">Reset</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </Form>
  );
};

export default Search;
