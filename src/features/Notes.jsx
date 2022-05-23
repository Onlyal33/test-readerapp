import { useState, useEffect, useRef } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { saveNotes } from './items/itemsSlice.js';

const Notes = ({ id, savedNotes, onHide }) => {
  const [notes, setNotes] = useState(savedNotes);
  const notesRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    notesRef.current.select();
  }, []);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(saveNotes({ id, notes }));
        onHide();
      }}
    >
      <Modal.Body>
        <Form.Control
          as="textarea"
          rows={5}
          id="notes"
          ref={notesRef}
          aria-label="edit notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" type="submit">Save</Button>
      </Modal.Footer>
    </Form>
  );
};

export default Notes;
