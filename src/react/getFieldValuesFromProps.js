
/**
 * Get all the values from the props
 * @param   {object} props
 * @param   {string} prop
 * @returns {object}
 */
export default function({props, prop}) {
  return Object.keys(props.fields).reduce((values, fieldName) => {
    values[fieldName] = props.fields[fieldName][prop];
    return values;
  }, {});
}
