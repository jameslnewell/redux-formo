
export default function({props}) {
  return Object.keys(props.fields).reduce((values, fieldName) => {
    values[fieldName] = props.fields[fieldName].value;
    return values;
  }, {});
}
