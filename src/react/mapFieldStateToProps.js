
const defaultProps = {
  active: false,
  filtering: false,
  validating: false,
  filtered: false,
  validated: false,
  valid: false,
  error: undefined,
  lastValidValue: undefined
};

/**
 * Get the props for a field from the state
 * @param   {string}  fieldName
 * @param   {object}  fieldState
 * @param   {*}       [defaultValue]
 * @returns {object}
 */
export default function mapFieldStateToProps(fieldName, fieldState, defaultValue) {
  const fieldValue = typeof fieldState.value !== 'undefined' ? fieldState.value : defaultValue;
  return {
    ...defaultProps,
    ...fieldState,
    name: fieldName,
    value: fieldValue,
    checked: typeof fieldValue === 'boolean' ? fieldValue === true : undefined,
    defaultValue: defaultValue,
    defaultChecked: typeof defaultValue === 'boolean' ? defaultValue === true : undefined
  };
}