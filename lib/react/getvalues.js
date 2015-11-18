
export default function getValues(fieldNames, fields, initialValues) {
  let values = {};
  fieldNames.forEach(fieldName => {
    values[fieldName] = fields[fieldName] && typeof fields[fieldName].value !== 'undefined' ?
      fields[fieldName].value :
    typeof initialValues[fieldName] !== 'undefined' ? initialValues[fieldName] : ''
    ;
  });
  return values;
}
