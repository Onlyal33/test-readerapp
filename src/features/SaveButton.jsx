import { Button } from 'react-bootstrap';
import { useStore } from 'react-redux';

import getLocalStorageFunc from '../common/localStorage.js';

const SaveButton = () => {
  const store = useStore();
  const saveToLocalStorage = getLocalStorageFunc('save');
  const handleClick = () => {
    const { searchResults, ...state } = store.getState().entities;
    saveToLocalStorage(state);
  };

  return (
    <Button variant="outline-primary" className="w-100 my-2 text-truncate" onClick={handleClick}>
      Save your data
    </Button>
  );
};

export default SaveButton;
