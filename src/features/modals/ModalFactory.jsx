import { useSelector } from 'react-redux';
import getModal from './index.js';

const ModalFactory = () => {
  const modalsState = useSelector((state) => state.ui.modals);

  if (!modalsState.type) {
    return null;
  }

  const Component = getModal(modalsState.type);
  return <Component item={modalsState.item} />;
};

export default ModalFactory;
