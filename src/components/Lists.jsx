import {
  ButtonGroup, Button, Dropdown, Nav,
} from 'react-bootstrap';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { changeActiveList, openModal, closeModal } from '../slices/uiSlice.js';
import getModal from './modals/index.js';

const renderModal = ({ modalsState, hideModal }) => {
  if (!modalsState.type) {
    return null;
  }

  const Component = getModal(modalsState.type);
  return <Component modalsState={modalsState} onHide={hideModal} />;
};

const renderList = ({
  list, activeList, handleSelectList, showModal,
}) => {
  const { id, name } = list;
  const variant = id === activeList ? 'outline-secondary' : null;

  if (list.type === 'default') {
    return (
      <Nav.Item key={id} className="w-100">
        <Button onClick={handleSelectList(id)} variant={variant} className="w-100 text-start text-truncate fw-bold">{name}</Button>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item key={id} className="w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button onClick={handleSelectList(id)} variant={variant} className="w-100 border-end-0 text-start text-truncate">{name}</Button>
        <Dropdown.Toggle split variant={variant} className="border-start-0" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => showModal('delete', list)}>Remove List</Dropdown.Item>
          <Dropdown.Item onClick={() => showModal('rename', list)}>Rename List</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

const Lists = () => {
  const lists = useSelector((state) => Object.values(state.entities.lists.byId), shallowEqual);
  const activeList = useSelector((state) => state.ui.activeList);
  const modalsState = useSelector((state) => state.ui.modals);

  const dispatch = useDispatch();
  const handleSelectList = (id) => () => {
    dispatch(changeActiveList({ id }));
  };

  const hideModal = () => dispatch(closeModal());
  const showModal = (type, item = null) => dispatch(openModal({ type, item }));

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
        {lists.map((list) => renderList({
          list, activeList, handleSelectList, showModal,
        }))}
        {renderModal({ modalsState, hideModal })}
      </Nav>
    </>
  );
};

export default Lists;
