import { useDispatch } from 'react-redux';

import {
  openModal, closeModal,
} from '../features/uiSlice.js';

export default () => {
  const dispatch = useDispatch();

  const hideModal = () => dispatch(closeModal());
  const showModal = (type, item = null) => dispatch(openModal({ type, item }));

  return { hideModal, showModal };
};
