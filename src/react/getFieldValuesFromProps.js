
/**
 * Get all the values from the props
 * @param   {string} prop
 * @param   {object} state
 * @returns {object}
 */
export default function(prop, state) {
  return Object.keys(state.fields).reduce((values, fieldName) => {
    values[fieldName] = state.fields[fieldName][prop];
    return values;
  }, {});
}
