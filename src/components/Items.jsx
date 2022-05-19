import {
  Card, ListGroup,
} from 'react-bootstrap';
// eslint-disable-next-line arrow-body-style
const Items = () => {
  return (
    <ListGroup variant="flush" className="my-2">
      <Card as={ListGroup.Item} action onClick={null} className="rounded-0">
        <Card.Body>
          <Card.Title>Title</Card.Title>
          <Card.Subtitle>Author</Card.Subtitle>
          <Card.Text>
            Sed ut perspiciatis unde omnis iste natus error...
          </Card.Text>
        </Card.Body>
      </Card>
      <Card as={ListGroup.Item} action onClick={null} className="rounded-0">
        <Card.Body>
          <Card.Title>Title</Card.Title>
          <Card.Subtitle>Author</Card.Subtitle>
          <Card.Text>
            Description.
          </Card.Text>
        </Card.Body>
      </Card>
    </ListGroup>
  );
};

export default Items;
