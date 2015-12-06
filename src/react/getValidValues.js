
export default function(fieldNames, fields, initialValues) {
  const values = {};
  fieldNames.forEach(fieldName => {
    values[fieldName] = fields[fieldName] && typeof fields[fieldName].validValue !== 'undefined'
      ? fields[fieldName].validValue
      : typeof initialValues[fieldName] !== 'undefined' ? initialValues[fieldName] : ''
    ;
  });
  return values;
}
