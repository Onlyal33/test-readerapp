import { Button } from 'react-bootstrap';
import { useStore } from 'react-redux';
import { toast } from 'react-toastify';

import getLocalStorageFunc from '../common/localStorage.js';

const SaveButton = () => {
  const store = useStore();
  const saveState = getLocalStorageFunc('save');
  const handleClick = () => {
    const { searchResults, ...state } = store.getState().entities;
    saveState(state);
    toast.info('Your data has been saved');
  };

  return (
    <Button variant="outline-primary" className="w-100 my-2 text-truncate" onClick={handleClick}>
      Save your data
    </Button>
  );
};

export default SaveButton;
