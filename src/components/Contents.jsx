import {
  Card, Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const getActiveItem = (state) => state.entities.items.byId[state.ui.activeItem]
  ?? state.entities.searchResults.byId[state.ui.activeItem];

const Contents = () => {
  const activeItem = useSelector(getActiveItem);

  if (!activeItem) {
    return null;
  }

  const {
    title, author, firstPublishYear, description,
  } = activeItem;
  return (
    <Card className="border-0 my-2 flex-grow-1 overflow-auto">
      <Card.Header>{author?.join(', ')}</Card.Header>
      <Card.Body>
        <Card.Title>
          {title}
          <span className="italic">{firstPublishYear}</span>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary">Add</Button>
      </Card.Body>
    </Card>
  );
};

export default Contents;
