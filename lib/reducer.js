import * as constants from './constants';

/**
 * Mark a field as focused
 * @param   {object}  state         The field state
 * @returns {{fields: {}}}
 */
export function focus(state) {
  return {
    ...state,
    active: true
  }
}

/**
 * Mark a field as blurred
 * @param   {object}  state         The field state
 * @returns {{fields: {}}}
 */
export function blur(state) {
  return {
    ...state,
    active: false
  }
}

/**
 * Update the value of a field
 * @param   {object}  state         The field state
 * @param   {object}  action
 * @param   {string}  action.value
 * @returns {{fields: {}}}
 */
export function change(state, action) {
  const {value} = action;
  return {
    ...state,
    value: String(value)
  }
}

/**
 * Filter the value of a field
 * @param   {object}  state         The field state
 * @returns {{filtering: {bool}}}
 */
export function startFiltering(state) {
  return {
    ...state,
    filtering: true
  };
}

/**
 * Filter the value of a field
 * @param   {object}  state         The field state
 * @param   {object}  action
 * @param   {string}  action.value
 * @returns {{filtering: bool, filtered: bool}}
 */
export function finishFiltering(state, action) {
  const {value} = action;
  return {
    ...state,
    value: String(value),
    filtering: false,
    filtered: true
  };
}

/**
 * Validate the value of a field
 * @param   {object}  state         The field state
 * @returns {{filtering: {bool}}}
 */
export function startValidating(state) {
  return {
    ...state,
    validating: true
  };
}

/**
 * Validate the value of a field
 * @param   {object}  state         The field state
 * @param   {object}  action
 * @param   {bool}    action.valid
 * @param   {string}  action.error
 *
 * @returns {{filtering: bool, filtered: bool}}
 */
export function finishValidating(state, action) {
  const {error, valid} = action;
  return {
    ...state,
    error: String(error),
    valid: Boolean(valid),
    validating: false,
    validated: true,
    validValue: String(state.value)
  };
}

/**
 * Submit the value of a field
 * @param   {object}  state
 * @param   {object}  state.fields
 * @param   {object}  action
 * @param   {string}  action.field
 * @param   {bool}    action.valid
 * @param   {string}  action.error
 * @returns {{fields: {}}}
 */
export function submit(state, action) {
  if (action.status === 'start') {
    return {...state, submitting: true, submitted: false, error: null};
  } else if (action.status === 'error') {
    return {...state, submitting: false, submitted: false, error: String(action.error)};
  } else {
    return {...state, submitting: false, submitted: true, error: null};
  }
}

function extractFormState(formName, state = {}) {
  return state[formName] || {fields: {}};
}

function extractFieldState(formName, fieldName, state = {fields: {}}) {
  return state.fields[fieldName] || {};
}

function composeFormState(formName, fieldName, fieldState, state) {
  return {...state, fields: {...[state.fields], [fieldName]: fieldState}};
}

function composeFormsState(formName, formState, state) {
  return {...state, [formName]: formState};
}

function modifyField(formName, fieldName, state, action, method) {
  const
    formState = extractFormState(formName, state),
    fieldState = extractFieldState(formName, fieldName, formState),
    newFieldState = method(fieldState, action),
    newFormState = composeFormState(formName, fieldName, newFieldState, formState),
    newState = composeFormsState(formName, newFormState, formState)
  ;
  return newState;
}

/**
 * The form reducer
 * @param   {object} state
 * @param   {object} action
 * @returns {object}
 */
export default function(state = {}, action = {}) {
  let {form, field} = action;

  switch (action.type) {

    case constants.FOCUS:
      return modifyField(form, field, state, action, focus);

    case constants.BLUR:
      return modifyField(form, field, state, action, blur);

    case constants.CHANGE:
      return modifyField(form, field, state, action, change);

    case constants.FILTER_START:
      return modifyField(form, field, state, action, startFiltering);

    case constants.FILTER:
    case constants.FILTER_FINISH:
      return modifyField(form, field, state, action, finishFiltering);

    case constants.VALIDATE_START:
      return modifyField(form, field, state, action, startValidating);

    case constants.VALIDATE:
    case constants.VALIDATE_FINISH:
      return modifyField(form, field, state, action, finishValidating);

    case constants.SUBMIT:
      return {...state, [formName]: submit(formState, action)};

    default:
      return state;

  }

}