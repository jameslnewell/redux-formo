
export default function(field, state) {

  if (!state) {
    return {};
  }

  if (!state.fields) {
    return {};
  }

  if (!state.fields[field]) {
    return {};
  }

  return state.fields[field];
}
