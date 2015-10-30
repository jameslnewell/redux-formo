import * as actions from './types';

function reset(state, action) {
  let {values} = action;
}

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

function validate(state, action) {
  let {field, valid, error} = action;
  console.log('valid', action);
  let formFields = state.fields, fieldState = state.fields[field];
  fieldState = {...fieldState, valid, error};
  return {...state, fields: {...formFields, [field]: fieldState}};
}

/**
 * Create a form reducer
 * @param   {string}          form    The name of the form
 * @param   {Array.<string>}  fields  The names of the form fields
 * @returns {Function}
 */
export default function(form, fields) {

  //prob want to validate the initial values with the user's validator which means they live in middle ware
  let initialState = {[form]: {
    valid: false,
    fields: Object.assign.apply(null, fields.map(name => {
      return {[name]: {
        value: '',
        valid: false,
        active: false
      }};
    }))
  }};

  return function(state = initialState, action = {}) {
    let formState = state[form];

    switch (action.type) {

      case actions.RESET_FORM:
        return initialState;
        return {...state, [form]: reset(formState, action)};

      case actions.FOCUS_FORM:
        return {...state, [form]: focus(formState, action)};

      case actions.BLUR_FORM:
        return {...state, [form]: blur(formState, action)};

      case actions.UPDATE_FORM:
        return {...state, [form]: update(formState, action)};

      case actions.FILTER_FORM:
        return {...state, [form]: filter(formState, action)};

      case actions.VALIDATE_FORM:
        return {...state, [form]: validate(formState, action)};

      default:
        return state;

    }

  }
}