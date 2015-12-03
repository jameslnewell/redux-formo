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
 * @param   {string}  action.value  The field value
 * @returns {{fields: {}}}
 */
export function change(state, action) {
  const {value} = action;
  return {
    ...state,
    value: value || ''
  }
}

/**
 * Start filtering the value of a field
 * @param   {object}  state         The field state
 * @returns {{filtering: {boolean}}}
 */
export function startFiltering(state) {
  return {
    ...state,
    filtering: true
  };
}

/**
 * Finish filtering the value of a field
 * @param   {object}  state         The field state
 * @param   {object}  action
 * @param   {string}  action.value  The field value
 * @returns {{filtering: boolean, filtered: boolean}}
 */
export function finishFiltering(state, action) {
  const {value} = action;
  return {
    ...state,
    value: value || '',
    filtering: false,
    filtered: true
  };
}

/**
 * Start validating the value of a field
 * @param   {object}  state         The field state
 * @returns {{filtering: {boolean}}}
 */
export function startValidating(state) {
  return {
    ...state,
    validating: true
  };
}

/**
 * Finish validating the value of a field
 * @param   {object}  state         The field state
 * @param   {object}  action
 * @param   {boolean} action.valid  Whether the field value is valid
 * @param   {string}  [action.error] The reason why the field is invalid
 *
 * @returns {{filtering: boolean, filtered: boolean}}
 */
export function finishValidating(state, action) {
  const {error, valid} = action;
  return {
    ...state,
    error: error || '',
    validating: false,
    validated: true,
    valid: valid || false,
    validValue: valid ? state.value || '' : state.validValue || ''
  };
}

/**
 * Submit the value of a field
 * @param   {object}  state
 * @param   {object}  action
 * @param   {boolean} action.status
 * @param   {string}  action.error
 * @returns {{error: string, submitting: boolean, submitted: boolean}}
 */
export function submit(state, action) {
  const {status, error} = action;
  if (status === 'start') {
    return {...state, submitting: true};
  } else if (status === 'error') {
    return {...state, error: error || '', submitting: false, submitted: false};
  } else {
    return {...state, error: '', submitting: false, submitted: true};
  }
}

export function startSubmitting(state, action) {
  return {...state, submitting: true};
}

export function finishSubmitting(state, action) {
  return {...state, error: '', submitting: false, submitted: true};
}

export function errorSubmitting(state, action) {
  return {...state, error: error || '', submitting: false, submitted: false};
}


function extractFormState(formName, state = {}) {
  return state[formName] || {};
}

function extractFieldState(fieldName, state) {
  return state.fields && state.fields[fieldName] || {};
}

function composeFormState(fieldName, fieldState, state) {
  return {...state, fields: {...(state.fields), [fieldName]: fieldState}};
}

function composeFormsState(formName, formState, state) {
  return {...state, [formName]: formState};
}

function modifyForm(formName, state, action, method) {
  const
    formState = extractFormState(formName, state),
    newFormState = method(formState, action),
    newState = composeFormsState(formName, newFormState, state)
  ;
  return newState;
}

function modifyField(formName, fieldName, state, action, method) {
  const
    formState = extractFormState(formName, state),
    fieldState = extractFieldState(fieldName, formState),
    newFieldState = method(fieldState, action),
    newFormState = composeFormState(fieldName, newFieldState, formState),
    newState = composeFormsState(formName, newFormState, state)
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
      return modifyForm(form, state, action, submit);

    default:
      return state;

  }

}