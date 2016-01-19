
/**
 * Merge the default values into a fields object
 * @param   {object}  fields
 * @param   {object}  defaults
 * @returns {*}
 */
function mergeFieldDefaults(fields, defaults) {
  return Object.keys(defaults).reduce((prev, field) => ({
    ...prev,
    [field]: {
      ...prev[field],
      value: defaults[field],
      defaultValue: defaults[field]
    }
  }), fields);
}

/**
 * Set default values for the form fields and mark the form as initialised
 * @param   {object}  state
 * @param   {object}  action
 * @param   {object}  action.payload
 * @returns {object}
 */
export default function initialise(state, action) {
  const fields = state.fields || {};
  return {
    ...state,
    fields: {
      ...fields,
      ...mergeFieldDefaults(fields, action.payload)
    },
    initialised: true
  };
}
