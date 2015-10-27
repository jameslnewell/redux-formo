import * as actions from './types';

function focus(state, action) {
  let {field} = action;
  let formFields = state.fields;
  let fieldState = state.fields[field];
  fieldState = {...fieldState, active: true};
  return {...state, fields: {...formFields, [field]: fieldState}};
}

function blur(state, action) {
  let {field} = action;
  let formFields = state.fields;
  let fieldState = state.fields[field];
  fieldState = {...fieldState, active: false};
  return {...state, fields: {...formFields, [field]: fieldState}};
}

function update(state, action) {
  let {field, value} = action;
  let formFields = state.fields;
  let fieldState = state.fields[field];
  fieldState = {...fieldState, value: value};
  return {...state, fields: {...formFields, [field]: fieldState}};
}

function filter(state, action) {
  let {field, value} = action;
  console.log('filter', action);
  let formFields = state.fields, fieldState = state.fields[field];
  fieldState = {...fieldState, value: value};
  return {...state, fields: {...formFields, [field]: fieldState}};
}

/**
 * Create a form reducer
 * @param   {string}          form    The name of the form
 * @param   {Array.<string>}  fields  The names of the form fields
 * @returns {Function}
 */
export default function(form, fields, initialValues = {}) {

  //prob want to validate the initial values with the user's validator which means they live in middle ware
  let initialState = {
    valid: false,
    fields: Object.assign.apply(null, fields.map(name => {
      return {[name]: {
        value: '',
        valid: false,
        active: false
      }};
    }))
  };

  return function(state = initialState, action = {}) {

    //ignore actions targetted at other forms
    if (action.form !== form) {
      return state;
    }
console.log(action);
    switch (action.type) {

      case actions.RESET_FORM:
        return initialState;

      case actions.FOCUS_FORM:
        return focus(state, action);

      case actions.BLUR_FORM:
        return blur(state, action);

      case actions.UPDATE_FORM:
        return update(state, action);

      case actions.FILTER_FORM:
        return filter(state, action);

      case actions.VALIDATE_FORM:
        return state;

      default:
        return state;

    }

  }
}