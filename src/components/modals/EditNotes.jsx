import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal, Button, Form,
} from 'react-bootstrap';

import { saveNotes } from '../../slices/itemsSlice.js';

const EditNotes = ({ onHide, modalsState: { item } }) => {
  const { id, title, notes } = item;
  const [state, setState] = useState(notes);
  const modalRef = useRef();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveNotes({ id, notes: state }));
    onHide();
  };

  useEffect(() => {
    modalRef.current.select();
  }, []);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {title}
          : Edit Notes
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={5}
            id="notes"
            ref={modalRef}
            aria-label="edit notes"
            value={state}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditNotes;
