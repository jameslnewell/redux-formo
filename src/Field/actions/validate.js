import {VALIDATE} from '../constants';
import getFieldValue from '../../util/getFieldValue';
import getFieldValues from '../../util/getFieldValues';

function startValidating(form, field) {
  return {
    type: VALIDATE,
    status: 'start',
    meta: {
      form,
      field
    }
  };
}

function finishValidating(form, field, result) {
  return {
    type: VALIDATE,
    status: 'finish',
    payload: result,
    meta: {
      form,
      field
    }
  };
}

/**
 * Create a validate error action
 * @param   {string}    form          The form name
 * @param   {string}    field         The field name
 * @param   {Error}     error         The validation error
 * @returns {{type, status: string, meta: {form: string, field: string}, payload: Error}}
 */
function errorValidating(form, field, error) {
  return {
    type: VALIDATE,
    status: 'error',
    payload: error,
    meta: {
      form,
      field
    }
  };
}

/**
 * Validate the form values or a single value
 * @param   {string}    getFormState  The state subsection
 * @param   {string}    form          The form name
 * @param   {string}    field         The field name
 * @param   {function}  fn            The validation function
 * @returns {function}
 */
export default function(getFormState, form, field, fn) {
  return (dispatch, getState) => {

    const formState = getFormState(form, getState());
    const value = getFieldValue(field, formState);
    const values = getFieldValues(formState);

    //enter the validating state when promise doesn't resolve immediately
    const timeout = setTimeout(() => dispatch(startValidating(form, field)), 0);

    //call the user's validate function and handle any synchronous errors
    let promise = null;
    try {
      promise = fn({field, value, values});
    } catch (error) {
      promise = Promise.reject(error);
    }

    //resolve the result of the user's validate function
    return Promise.resolve(promise)
      .then(
        result => {

          //don't bother entering the validating state when the promise resolves instantly
          clearTimeout(timeout);

          //complete the validation
          dispatch(finishValidating(form, field, result));

          return result === true;
        },
        error => {

          //don't bother entering the validating state when the promise resolves instantly
          clearTimeout(timeout);

          //complete the validation
          dispatch(errorValidating(form, field, error));

          throw error;
        }
      )
    ;

  };
}
