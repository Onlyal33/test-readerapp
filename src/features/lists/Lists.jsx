import {
  Button, Nav,
} from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import List from './List.jsx';
import useModal from '../../common/useModal.js';

const Lists = () => {
  const listsIds = useSelector((state) => state.entities.lists.allIds, shallowEqual);
  const { showModal } = useModal();

  return (
    <>
      <div className="d-flex my-2 justify-content-between">
        <span>Your Lists</span>
        <Button variant="link" className="p-0 text-secondary" onClick={() => showModal('add')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">Add List</span>
        </Button>
      </div>
      <Nav>
        {listsIds.map((id) => <List key={id} id={id} />)}
      </Nav>
    </>
  );
};

export default Lists;
