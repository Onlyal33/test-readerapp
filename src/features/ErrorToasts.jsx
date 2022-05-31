import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { errorMessageShown, selectNetworkError } from './uiSlice';

const ErrorToasts = () => {
  const networkError = useSelector(selectNetworkError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (networkError) {
      toast.error(networkError, {
        onOpen: () => {
          dispatch(errorMessageShown());
        },
      });
    }
  }, [networkError]);

  return null;
};

export default ErrorToasts;
