import defaultSelectFormState from './selectFormState';

export default (form, field, selectFormState = defaultSelectFormState(form)) => state => {
  const formState = selectFormState(state);

  if (!formState.fields) {
    return {};
  }

  if (!formState.fields[field]) {
    return {};
  }

  return formState.fields[field];
};
