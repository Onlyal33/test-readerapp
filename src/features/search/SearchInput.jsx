/* eslint-disable react/jsx-props-no-spreading */
import {
  FormControl, FloatingLabel,
} from 'react-bootstrap';
import { useField } from 'formik';
import { useEffect, forwardRef } from 'react';

const SearchInput = forwardRef(({ label, disabled, ...props }, ref) => {
  const [field] = useField(props);

  useEffect(() => {
    if (ref && !disabled) {
      ref.current.focus();
    }
  }, [disabled]);

  return label
    ? (
      <FloatingLabel
        label={label}
      >
        <FormControl {...field} {...props} placeholder="" type="text" aria-label={label} ref={ref} disabled={disabled} />
      </FloatingLabel>
    )
    : <FormControl {...field} {...props} placeholder="" type="text" aria-label="search" ref={ref} disabled={disabled} />;
});

export default SearchInput;
