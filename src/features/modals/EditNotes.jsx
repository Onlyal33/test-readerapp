import { Modal } from 'react-bootstrap';

import useModal from '../../common/useModal.js';
import Notes from '../Notes.jsx';

const EditNotes = ({ item }) => {
  const { id, title, notes } = item;
  const { hideModal } = useModal();

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {title}
          : Edit Notes
        </Modal.Title>
      </Modal.Header>
      <Notes id={id} savedNotes={notes} onHide={hideModal} />
    </Modal>
  );
};

export default EditNotes;
