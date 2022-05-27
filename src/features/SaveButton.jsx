import { Button } from 'react-bootstrap';
import { useStore } from 'react-redux';

import useLocalStorage from '../common/useLocalStorage';

const SaveButton = () => {
  const store = useStore();
  const { saveToLocalStorage } = useLocalStorage();
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
