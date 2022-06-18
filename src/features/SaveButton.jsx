import { Button } from 'react-bootstrap';
import { useStore } from 'react-redux';
import { toast } from 'react-toastify';

import getLocalStorageFunc from '../common/localStorage.js';

const SaveButton = () => {
  const store = useStore();
  const saveState = getLocalStorageFunc('save');
  const handleSaveState = () => {
    const { searchResults, ...state } = store.getState().entities;
    saveState(state);
    toast.info('Your data has been saved');
  };

  return (
    <Button variant="outline-primary" className="w-100 my-2 text-truncate" onClick={handleSaveState}>
      Save your data
    </Button>
  );
};

export default SaveButton;
