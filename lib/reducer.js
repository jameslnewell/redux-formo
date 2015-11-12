import * as actions from './types';

function init(state, action) {
  let {fields} = action;
  return state;
}

function reset(state, action) {
  let {values} = action;
  return state;
}

function focus(state, action) {
  let {field} = action;
  let formFields = state.fields;
  let fieldState = state.fields[field];
  fieldState = {...fieldState, active: true, touched: true};
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
  let formFields = state.fields, fieldState = state.fields[field];
  fieldState = {...fieldState, value: value};
  return {...state, fields: {...formFields, [field]: fieldState}};
}

function validate(state, action) {
  let {field, valid, error} = action;
  let formFields = state.fields, fieldState = state.fields[field];
  fieldState = {...fieldState, valid, error};
  return {...state, fields: {...formFields, [field]: fieldState}, validating: false}; //todo: validated: true - only when all the fields have been validated
}

function submit(state, action) {
  if (action.status === 'start') {
    return {...state, submitting: true, submitted: false, error: null};
  } else if (action.status === 'error') {
    return {...state, submitting: false, submitted: false, error: String(action.error)};
  } else {
    return {...state, submitting: false, submitted: true, error: null};
  }
}

/**
 * The form reducer
 * @param   {object} state
 * @param   {object} action
 * @returns {object}
 */
export default function(state = {}, action = {}) {
  let formName = action.form;
  let formState = state[formName] || {fields: {}};

  switch (action.type) {

    case actions.RESET:
      return {...state, [formName]: reset(formState, action)};

    case actions.FOCUS:
      return {...state, [formName]: focus(formState, action)};

    case actions.BLUR:
      return {...state, [formName]: blur(formState, action)};

    case actions.CHANGE:
      return {...state, [formName]: update(formState, action)};

    case actions.FILTER:
      return {...state, [formName]: filter(formState, action)};

    case actions.VALIDATE:
      return {...state, [formName]: validate(formState, action)};

    case actions.SUBMIT:
      return {...state, [formName]: submit(formState, action)};

    default:
      return state;

  }

}