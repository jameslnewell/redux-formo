import getField from '../util/getField';

export default options => (state, ownProps) => {
  const {getState, form, field} = options;
  const fieldState = getField(field, getState(form, state));

  const props = {

    //merge the defaults
    active: false,
    filtering: false,
    filtered: false,
    validating: false,
    validated: false,
    valid: false,

    //merge the current state
    ...fieldState

  };

  //calculate props
  if (typeof fieldState.value === 'boolean') {
    props.checked = fieldState.value === true;
  }
  //FIXME: hack to merge the defaults because the component won't receive the updated props before render() on the server
  if (!fieldState.initialised) {
    props.value = ownProps.defaultValue;
    props.defaultValue = ownProps.defaultValue;
  }

  return props;
};