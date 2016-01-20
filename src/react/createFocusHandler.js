
/**
 * @param   {object}  component   The form component
 * @param   {string}  fieldName   The field name
 * @returns {function}
 */
export default function(component, fieldName) {
  return () => component.form.focus(fieldName);
}
