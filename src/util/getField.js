
/**
 * Select state of a field from the form state
 * @param   {string} field  The form field
 * @param   {object} state  The form state
 * @returns {object}
 */
export default function(field, state) {
  if (state && state.fields && state.fields[field]) {
    return state.fields[field];
  } else {
    return {};
  }
}

