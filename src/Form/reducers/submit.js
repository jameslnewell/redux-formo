
/**
 * Start submitting a form
 * @param   {object}  state
 * @returns {{submitting: boolean}}
 */
function startSubmitting(state) {
  return {...state, submitting: true};
}

/**
 * Finish submitting a form
 * @param   {object}  state
 * @returns {{submitting: boolean}}
 */
function finishSubmitting(state) {
  return {...state, submitting: false, submitted: true, error: undefined};
}

/**
 * Error submitting a form
 * @param   {object}  state
 * @param   {object}  action
 * @param   {string}  action.payload  The form error
 * @returns {{submitting: boolean, error: string}}
 */
function errorSubmitting(state, action) {
  return {
    ...state,
    submitting: false,
    error: (action.payload && action.payload.message ? action.payload.message : String(action.payload)) || 'An unknown error occurred whilst submitting'
  };
}

/**
 * Submit the values of a form
 * @param   {object}  state           The form state
 * @param   {object}  action
 * @param   {string}  action.type
 * @param   {boolean} action.status
 * @param   {string}  [action.payload]
 * @returns {{submitting: boolean, [submitted]: boolean, [error]: string}}
 */
export default function(state, action) {

  switch (action.status) {

    case 'start':
      return startSubmitting(state);

    case 'finish':
      return finishSubmitting(state);

    case 'error':
      return errorSubmitting(state, action);

    default:
      return state;

  }
}
