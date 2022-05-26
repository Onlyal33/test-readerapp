import { useDispatch } from 'react-redux';

import {
  modalClosed, modalOpened,
} from '../features/uiSlice.js';

export default () => {
  const dispatch = useDispatch();

  const hideModal = () => dispatch(modalClosed());
  const showModal = (type, item = null) => dispatch(modalOpened({ type, item }));

  return { hideModal, showModal };
};
