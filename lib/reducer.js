import * as Action from './actions';


function focus(state, action) {
  let {fieldName} = action;
  let formFields = state.fields;
  let fieldState = state.fields[fieldName];
  fieldState = {...fieldState, active: true};
  return {...state, fields: {...formFields, [fieldName]: fieldState}};
}

function blur(state, action) {
  let {fieldName} = action;
  let formFields = state.fields;
  let fieldState = state.fields[fieldName];
  fieldState = {...fieldState, active: false};
  return {...state, fields: {...formFields, [fieldName]: fieldState}};
}

function change(state, action) {
  let {fieldName, fieldValue} = action;
  let formFields = state.fields;
  let fieldState = state.fields[fieldName];
  fieldState = {...fieldState, value: fieldValue};
  return {...state, fields: {...formFields, [fieldName]: fieldState}};
}

/**
 * Create a form reducer
 * @param   {string}          formName    The name of the form
 * @param   {Array.<string>}  fieldNames  The names of the form fields
 * @returns {Function}
 */
export default function(formName, fieldNames, initialValues = {}) {

  //prob want to validate the initial values with the user's validator which means they live in middle ware
  let initialState = {
    valid: false,
    fields: Object.assign.apply(null, fieldNames.map(name => {
      return {[name]: {
        value: '',
        valid: false,
        active: false
      }};
    }))
  };

  return function(state = initialState, action = {}) {

    //ignore actions targetted at other forms
    if (action.formName !== formName) {
      return state;
    }

    switch (action.type) {

      case Action.RESET_FORM:
        return initialState;

      case Action.FOCUS_FORM:
        return focus(state, action);

      case Action.BLUR_FORM:
        return blur(state, action);

      case Action.CHANGE_FORM:
        return change(state, action);

      case Action.VALIDATE_FORM:
        return state;

      default:
        return state;

    }

  }
}