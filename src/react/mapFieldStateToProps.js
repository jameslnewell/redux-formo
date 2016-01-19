
const defaultProps = {
  active: false,
  filtering: false,
  validating: false,
  filtered: false,
  validated: false,
  valid: false
};

/**
 * Get the props for a field from the state
 * @param   {string}  fieldName
 * @param   {object}  fieldState
 * @returns {object}
 */
export default function mapFieldStateToProps(fieldName, fieldState) {

  const props = {
    ...defaultProps,
    ...fieldState,
    name: fieldName
  };

  if (typeof fieldState.value !== 'undefined') {
    props.value = fieldState.value;
  }

  if (typeof fieldState.value === 'boolean') {
    props.checked = fieldState.value === true;
  }

  if (typeof fieldState.defaultValue === 'boolean') {
    props.defaultChecked = fieldState.defaultValue === true;
  }


  return props;
}
