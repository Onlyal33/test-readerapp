import { Button } from 'react-bootstrap';
import { useStore } from 'react-redux';

const SaveButton = () => {
  const store = useStore();
  const handleClick = () => {
    const { searchResults, ...state } = store.getState().entities;
    localStorage.setItem('readerAppState', JSON.stringify(state));
  };

  return (
    <Button variant="outline-primary" className="w-100 my-2 text-truncate" onClick={handleClick}>
      Save your data
    </Button>
  );
};

export default SaveButton;
