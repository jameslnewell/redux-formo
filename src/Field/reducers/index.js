import * as constants from '../constants';
import mapValues from '../../util/mapValues';
import initialise from '../../Field/reducers/initialise';
import destroy from '../../Form/reducers/destroy';

/**
 * Mark a field as focused
 * @param   {object}  state           The field state
 * @returns {{active: boolean}}
 */
function focus(state) {
  return {
    ...state,
    active: true
  };
}

/**
 * Mark a field as blurred
 * @param   {object}  state           The field state
 * @returns {{active: boolean}}
 */
function blur(state) {
  return {
    ...state,
    active: false
  };
}

/**
 * Update the value of a field
 * @param   {object}  state           The field state
 * @param   {object}  action
 * @param   {string}  action.payload  The field value
 * @returns {{value: string}}
 */
function change(state, action) {
  return {
    ...state,
    value: action.payload
  };
}

/**
 * Start filtering the value of a field
 * @param   {object}  state           The field state
 * @returns {{filtering: boolean}}
 */
function startFiltering(state) {
  return {
    ...state,
    filtering: true
  };
}

/**
 * Finish filtering the value of a field
 * @param   {object}  state           The field state
 * @param   {object}  action
 * @param   {string}  action.payload  The field value
 * @returns {{filtering: boolean, filtered: boolean, value: string}}
 */
function finishFiltering(state, action) {
  return {
    ...state,
    filtering: false,
    filtered: true,
    value: action.payload
  };
}

/**
 * Error filtering the value of a field
 * @param   {object}  state           The field state
 * @param   {object}  action
 * @param   {string}  action.payload  The field error
 * @returns {{filtering: boolean, error: string}}
 */
function errorFiltering(state, action) {
  return {
    ...state,
    filtering: false,
    error: (action.payload && action.payload.message ? action.payload.message : String(action.payload)) || 'An unknown error occurred whilst filtering'
  };
}

/**
 * Validate the value of a field
 * @param   {object}  state           The field state
 * @param   {object}  action
 * @param   {string}  action.status
 * @param   {string}  [action.payload]
 * @returns {{filtering: boolean, [filtered]: boolean, [value]: string}}
 */
function filter(state, action) {

  switch (action.status) {

    case 'start':
      return startFiltering(state);

    case 'finish':
      return finishFiltering(state, action);

    case 'error':
      return errorFiltering(state, action);

    default:
      return state;

  }

}

/**
 * Start validating the value of a field
 * @param   {object}  state           The field state
 * @returns {{filtering: {boolean}}}
 */
function startValidating(state) {
  return {
    ...state,
    validating: true
  };
}

/**
 * Finish validating the value of a field
 * @param   {object}  state           The field state
 * @param   {object}  action
 * @param   {string}  action.payload  The field status
 * @returns {{validating: boolean, validated: boolean, error: string, valid: boolean, [validValue]: string}}
 */
function finishValidating(state, action) {
  const valid = action.payload === true;

  const newState = {
    ...state,
    validating: false,
    validated: true,
    error: valid ? undefined : action.payload, //eslint-disable-line no-undefined
    valid,
    lastValidValue: state.value
  };

  return newState;
}

/**
 * Error validating the value of a field
 * @param   {object}  state           The field state
 * @param   {object}  action
 * @param   {string}  action.payload  The field error
 * @returns {{validating: boolean, error: string}}
 */
function errorValidating(state, action) {
  return {
    ...state,
    validating: false,
    error: (action.payload && action.payload.message ? action.payload.message : String(action.payload)) || 'An unknown error occurred whilst validating',
    valid: false
  };
}

/**
 * Validate the value of a field
 * @param   {object}  state           The field state
 * @param   {object}  action
 * @param   {boolean} action.status
 * @param   {string}  [action.payload]
 * @returns {{validating: boolean, [validated]: boolean, [error]: string, [valid]: boolean, [validValue]: string}}
 */
function validate(state, action) {

  switch (action.status) {

    case 'start':
      return startValidating(state);

    case 'finish':
      return finishValidating(state, action);

    case 'error':
      return errorValidating(state, action);

    default:
      return state;

  }

}

function createFormReducer(fn) {
  return (state, action) => {
    const {meta: {form}} = action;
    const
      formState = state[form] || {},
      newFormState = fn(formState, action)
    ;
    return {...state, [form]: {...formState, ...newFormState}};
  };
}

function createFieldReducer(fn) {
  return createFormReducer((state, action) => {
    const {meta: {field}} = action;
    const
      fieldState = state.fields && state.fields[field] || {},
      newFieldState = fn(fieldState, action)
    ;
    return {...state, fields: {...(state.fields), [field]: {...fieldState, ...newFieldState}}};
  });
}

export default {
  [constants.INITIALISE]: createFieldReducer(initialise),
  [constants.FOCUS]: createFieldReducer(focus),
  [constants.BLUR]: createFieldReducer(blur),
  [constants.CHANGE]: createFieldReducer(change),
  [constants.FILTER]: createFieldReducer(filter),
  [constants.VALIDATE]: createFieldReducer(validate)
};
