import getFormFromState from './getFormFromState';

export default function(key, form, field, state) {
  const formState = getFormFromState(key, form, state);

  if (!formState.fields) {
    return {};
  }

  if (!formState.fields[field]) {
    return {};
  }

  return formState.fields[field];
}
