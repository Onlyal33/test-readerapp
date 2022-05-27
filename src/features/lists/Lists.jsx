import { Nav } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';

import List from './List.jsx';
import { selectListsIds } from './listsSlice.js';

const Lists = () => {
  const listsIds = useSelector(selectListsIds, shallowEqual);

  return (
    <Nav>
      <List key={null} id={null} />
      {listsIds.map((id) => <List key={id} id={id} />)}
    </Nav>
  );
};

export default Lists;
