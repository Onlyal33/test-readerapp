import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';

import { deleteList } from '../../slices/listsSlice.js';

const generateOnSubmit = ({ onHide, dispatch, item }) => (e) => {
  e.preventDefault();
  dispatch(deleteList(item));
  onHide();
};

const Delete = ({ onHide, modalsState: { item } }) => {
  const { name } = item;
  const modalRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    modalRef.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Do you want to delete your list
          {' '}
          {name}
          ?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Form
          onSubmit={generateOnSubmit({
            dispatch, onHide, item,
          })}
        >
          <Form.Control
            as={Button}
            variant="danger"
            type="submit"
            ref={modalRef}
          >
            OK
          </Form.Control>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default Delete;
