import { Modal } from 'react-bootstrap';

import Notes from '../Notes.jsx';

const EditNotes = ({ onHide, modalsState: { item } }) => {
  const { id, title, notes } = item;

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {title}
          : Edit Notes
        </Modal.Title>
      </Modal.Header>
      <Notes id={id} savedNotes={notes} onHide={onHide} />
    </Modal>
  );
};

export default EditNotes;
