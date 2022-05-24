/* eslint-disable react/jsx-props-no-spreading */
import {
  FormControl, FloatingLabel,
} from 'react-bootstrap';
import { useField } from 'formik';

const SearchInput = ({ label, ...props }) => {
  const [field] = useField(props);

  return label
    ? (
      <FloatingLabel
        label={label}
      >
        <FormControl {...field} {...props} placeholder="" type="text" aria-label={label} />
      </FloatingLabel>
    )
    : <FormControl {...field} {...props} placeholder="" type="text" aria-label="search" />;
};

export default SearchInput;
