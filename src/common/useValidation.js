import * as yup from 'yup';

export default (names) => {
  const listNamesSchema = yup.object().shape({
    name: yup.string()
      .trim()
      .required('validation.required')
      .notOneOf(names, 'validation.exist'),
  });

  return listNamesSchema;
};
