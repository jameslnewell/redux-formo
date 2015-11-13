
export default function getValues(fields, defaults) {
  let values = {};
  for (let field in state.fields) {
    if (state.fields.hasOwnProperty(field)) {
      values[field] = state.fields[field].value;
    }
  }
  return values;
}