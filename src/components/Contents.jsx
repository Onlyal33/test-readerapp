import {
  Card, Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const getActiveItem = (state) => state.entities.items.byId[state.ui.activeItem];

const Contents = () => {
  const activeItem = useSelector(getActiveItem);

  if (!activeItem) {
    return null;
  }

  const { title, author, description } = activeItem;
  return (
    <Card className="rounded-0 border-0 h-100">
      <Card.Header>{author}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary">Add</Button>
      </Card.Body>
    </Card>
  );
};

export default Contents;
