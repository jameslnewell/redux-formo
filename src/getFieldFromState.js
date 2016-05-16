const STATE_KEY = 'form';

export default function(form, field, state) {

  if (!state) {
    return {};
  }

  if (!state[STATE_KEY]) {
    return {};
  }

  if (!state[STATE_KEY][form]) {
    return {};
  }

  if (!state[STATE_KEY][form].fields) {
    return {};
  }

  if (!state[STATE_KEY][form].fields[field]) {
    return {};
  }

  return state[STATE_KEY][form].fields[field];
}
