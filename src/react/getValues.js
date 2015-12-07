
export default function({props, prop}) {
  return Object.keys(props.fields).reduce((values, fieldName) => {
    values[fieldName] = props.fields[fieldName][prop];
    return values;
  }, {});
}
