import {
  ButtonGroup, Button, Dropdown, Nav,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { activeListChanged } from '../uiSlice.js';
import useModal from '../../common/useModal.js';
import { searchHidden } from '../search/searchResultsSlice.js';

const List = ({ id }) => {
  const list = useSelector((state) => state.entities.lists.byId[id] ?? { type: 'default', name: 'Library' });
  const isListActive = useSelector((state) => state.ui.activeList === id);
  const variant = isListActive ? 'outline-secondary' : null;
  const dispatch = useDispatch();
  const { showModal } = useModal();

  const handleSelectList = () => {
    dispatch(activeListChanged({ id }));
    dispatch(searchHidden());
  };

  if (list.type !== 'user') {
    return (
      <Nav.Item key={id} className="w-100">
        <Button onClick={handleSelectList} variant={variant} className="w-100 text-start text-truncate">{list.name}</Button>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item key={id} className="w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button onClick={handleSelectList} variant={variant} className="w-100 border-end-0 text-start text-truncate">{list.name}</Button>
        <Dropdown.Toggle split variant={variant} className="border-start-0" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => showModal('deleteList', list)}>Remove List</Dropdown.Item>
          <Dropdown.Item onClick={() => showModal('renameList', list)}>Rename List</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default List;
