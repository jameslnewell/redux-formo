import {isFSA, isError} from 'flux-standard-action';
import {SUBMIT} from './../constants';
import selectForm from '../../selectForm';
import selectLastValidValues from '../../selectLastValidValues';

function startSubmitting(form) {
  return {
    type: SUBMIT,
    status: 'start',
    meta: {
      form
    }
  };
}

function finishSubmitting(form) {
  return {
    type: SUBMIT,
    status: 'finish',
    meta: {
      form
    }
  };
}

/**
 * Create a submit error action
 * @param {string}  form
 * @param {Error}   error
 * @returns {{type, status: string, payload: Error, meta: {form: string}}}
 */
function errorSubmitting(form, error) {
  return {
    type: SUBMIT,
    status: 'error',
    payload: error,
    meta: {
      form
    }
  };
}

/**
 * Call the user's submit method with the form field values and dispatch actions when it is completed
 * @param   {string}    key           The state subsection
 * @param   {string}    form          The form name
 * @param   {function}  fn            The submit function
 * @returns {function}
 */
export default function(key, form, fn) {
  return (dispatch, getState) => {

    const state = selectForm(key, form, getState());
    const values = selectLastValidValues(state);

    //enter the submitting state when promise doesn't resolve immediately
    const timeout = setTimeout(() => dispatch(startSubmitting(form)), 0);

    //call the user's submit function and handle any synchronous errors
    let promise = null;
    try {
      promise = fn({dispatch, values});
    } catch (error) {
      promise = Promise.reject(error);
    }

    //resolve the result of the user's submit function
    return Promise.resolve(promise)
      .then(
        result => {

          //don't bother entering the submitting state when the promise resolves instantly
          clearTimeout(timeout);

          //dispatch an error if the result is a Flux Standard Action error
          if (isFSA(result) && isError(result)) {

            //complete the submission
            dispatch(errorSubmitting(form, result.payload));

            throw result.payload;

          } else {

            //complete the submission
            dispatch(finishSubmitting(form));

          }

        },
        error => {

          //don't bother entering the submitting state when the promise resolves instantly
          clearTimeout(timeout);

          //complete the submission
          dispatch(errorSubmitting(form, error));

          throw error;
        }
      )
    ;

  };
}
