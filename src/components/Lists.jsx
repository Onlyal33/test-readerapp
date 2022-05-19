import {
  ListGroup,
} from 'react-bootstrap';
// eslint-disable-next-line arrow-body-style
const Lists = () => {
  return (
    <>
      <div className="d-flex justify-content-center my-2">Your lists</div>
      <ListGroup className="my-2">
        <ListGroup.Item action onClick={null} variant="outline-secondary" className="border-0 text-start text-truncate">All</ListGroup.Item>
        <ListGroup.Item action onClick={null} variant="outline-secondary" className="border-0 text-start text-truncate">Read</ListGroup.Item>
        <ListGroup.Item action onClick={null} variant="outline-secondary" className="border-0 text-start text-truncate">Unread</ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default Lists;
