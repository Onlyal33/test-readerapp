import {
  Card, Button,
} from 'react-bootstrap';
// eslint-disable-next-line arrow-body-style
const Contents = () => {
  return (
    <Card className="rounded-0 border-0 h-100">
      <Card.Header>Author</Card.Header>
      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </Card.Text>
        <Button variant="primary">Add</Button>
      </Card.Body>
    </Card>
  );
};

export default Contents;
