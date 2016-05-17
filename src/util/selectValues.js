
/**
 * Select the value of all the fields from the form state
 * @param   {object} state  The form state
 * @returns {object}
 */
export default function(state) {
  if (state && state.fields) {
    return Object.keys(state.fields).reduce((values, fieldName) => {
      values[fieldName] = state.fields[fieldName].value;
      return values;
    }, {});
  } else {
    return {};
  }
}
