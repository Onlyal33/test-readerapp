import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { errorMessageShown, selectNetworkError } from './uiSlice.js';

const ErrorToasts = () => {
  const networkError = useSelector(selectNetworkError);
  const dispatch = useDispatch();

  if (networkError) {
    toast.error(networkError, {
      toastId: networkError,
      onClose: () => dispatch(errorMessageShown()),
    });
  }

  return null;
};

export default ErrorToasts;
