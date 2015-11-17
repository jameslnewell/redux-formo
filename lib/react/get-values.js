
export default function getValues(fields, defaults) {
  let values = {};
  for (let fieldName in fields) {
    if (fields.hasOwnProperty(fieldName)) {
      values[fieldName] = typeof fields[fieldName].value === 'undefined' ? defaults[fieldName] || '' : fields[fieldName].value;
    }
  }
  return values;
}
