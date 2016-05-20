
export default (state, ownProps) => {
  const {name, getState} = ownProps;
  const formState = getState(name, state);

  //calculate state
  let filtering = false;
  let validating = false;
  let valid = false;
  const fieldNames = [];
  if (formState.fields) {
    valid = true;
    Object.keys(formState.fields).forEach(fieldName => {
      fieldNames.push(fieldName);
      const field = formState.fields[fieldName] || {};
      filtering = filtering || Boolean(field.filtering);
      validating = validating || Boolean(field.validating);
      valid = valid && Boolean(field.valid);
    });
  }

  const props = {

    //rename some props
    filterFn: ownProps.filter,
    validateFn: ownProps.validate,

    //merge the defaults
    submitting: false,
    submitted: false,
    error: undefined, //eslint-disable-line no-undefined

    //merge the current state
    ...formState,

    //merge the calculated state
    filtering,
    validating,
    valid,

    //returning a new array each time causes the form to always be re-rendered -> hence the Form.shouldComponentUpdate() hook
    fields: fieldNames //FIXME: this can be removed when we move form filtering/validating/submitting to an action creator

  };

  //delete the field states with the field names so we don't update the form every time a field changes
  //delete props.fields;

  return props;
};
