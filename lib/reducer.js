import * as actions from './types';

function init(state, action) {
  let {fields} = action;
  return {
    valid: false,
    submitting: false,
    validating: false,
    fields: Object.assign.apply(null, fields.map(fieldName => {
      return {[fieldName]: {
        value: '',
        valid: false,
        validating: false,
        active: false,
        error: null
      }};
    }).concat({}))
  };
}

function reset(state, action) {
  let {values} = action;
  return state;
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
  let formFields = state.fields, fieldState = state.fields[field];
  fieldState = {...fieldState, value: value};
  return {...state, fields: {...formFields, [field]: fieldState}};
}

function validate(state, action) {
  let {field, valid, error} = action;
  let formFields = state.fields, fieldState = state.fields[field];
  fieldState = {...fieldState, valid, error};
  return {...state, fields: {...formFields, [field]: fieldState}};
}

/**
 * The form reducer
 * @param   {object} state
 * @param   {object} action
 * @returns {object}
 */
export default function(state = {}, action = {}) {
  let formName = action.form;
  let formState = state[formName];

  switch (action.type) {

    case actions.INIT:
      return {...state, [formName]: init(formState, action)};

    case actions.RESET:
      return {...state, [formName]: reset(formState, action)};

    case actions.FOCUS:
      return {...state, [formName]: focus(formState, action)};

    case actions.BLUR:
      return {...state, [formName]: blur(formState, action)};

    case actions.UPDATE:
      return {...state, [formName]: update(formState, action)};

    case actions.FILTER:
      return {...state, [formName]: filter(formState, action)};

    case actions.VALIDATE_FORM:
      return {...state, [formName]: validate(formState, action)};

    default:
      return state;

  }

}