import {isFSA, isError} from 'flux-standard-action';

import * as actions from './constants';

export function focus(form, field) {
  return {
    type: actions.FOCUS,
    meta: {
      form,
      field
    }
  };
}

export function blur(form, field) {
  return {
    type: actions.BLUR,
    meta: {
      form,
      field
    }
  };
}

/**
 * Change the value of a field
 * @param   {string}    form          The form name
 * @param   {string}    field         The field name
 * @param   {string}    value         The field value
 * @returns {{type: CHANGE, form: string, field: string, value: string}}
 */
export function change(form, field, value) {
  return {
    type: actions.CHANGE,
    payload: value,
    meta: {
      form,
      field
    }
  };
}
/**
 * Create a filter error action
 * @param {string}  form
 * @param {Error}   error
 * @returns {{type, status: string, payload: Error, meta: {form: string}}}
 */
function filterError(form, field, error) {
  return {
    type: actions.FILTER,
    status: 'error',
    payload: error,
    meta: {
      form,
      field
    }
  };
}

/**
 * Filter the form values or a single value
 * @param   {string}    form          The form name
 * @param   {string}    field         The field name
 * @param   {string}    value         The field value
 * @param   {object}    values        The valid values
 * @param   {function}  fn            The filter function
 * @returns {function}
 */
export function filter(form, field, value, values, fn) {
  return (dispatch) => {

    //enter the filtering state when promise doesn't resolve immediately
    const timeout = setTimeout(() => {
      dispatch({
        type: actions.FILTER,
        status: 'start',
        meta: {
          form,
          field
        }
      });
    }, 0);

    //call the user's filter function and handle any synchronous errors
    let promise = null;
    try {
      promise = fn({field, value, values});
    } catch (error) {
      promise = Promise.reject(error);
    }

    //resolve the result of the user's filter function
    return Promise.resolve(promise)
      .then(
        result => {

          //don't bother entering the filtering state when the promise resolves instantly
          clearTimeout(timeout);

          //complete the filtration
          dispatch({
            type: actions.FILTER,
            status: 'finish',
            payload: result,
            meta: {
              form,
              field
            }
          });

          return result;
        },
        error => {

          //don't bother entering the filtering state when the promise resolves instantly
          clearTimeout(timeout);

          //complete the filtration
          dispatch(filterError(form, field, error));

          throw error;
        }
      )
    ;

  };
}

/**
 * Create a validate error action
 * @param {string}  form
 * @param {Error}   error
 * @returns {{type, status: string, payload: Error, meta: {form: string}}}
 */
function validateError(form, field, error) {
  return {
    type: actions.VALIDATE,
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
 * @param   {string}    form          The form name
 * @param   {string}    field         The field name
 * @param   {string}    value         The field value
 * @param   {object}    values        The form values
 * @param   {function}  fn            The validation function
 * @returns {function}
 */
export function validate(form, field, value, values, fn) {
  return (dispatch) => {

    //enter the validating state when promise doesn't resolve immediately
    const timeout = setTimeout(() => {
      dispatch({
        type: actions.VALIDATE,
        status: 'start',
        meta: {
          form,
          field
        }
      });
    }, 0);

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
          if (result === true) {

            dispatch({
              type: actions.VALIDATE,
              status: 'finish',
              meta: {
                form,
                field
              }
            });

          } else {
            dispatch(validateError(form, field, result));
            throw new Error(result);
          }

          return result === true;
        },
        error => {

          //don't bother entering the validating state when the promise resolves instantly
          clearTimeout(timeout);

          //complete the validation
          dispatch(validateError(form, field, error));

          throw error;
        }
      )
    ;

  };
}

/**
 * Create a submit error action
 * @param {string}  form
 * @param {Error}   error
 * @returns {{type, status: string, payload: Error, meta: {form: string}}}
 */
function submitError(form, error) {
  return {
    type: actions.SUBMIT,
    status: 'error',
    payload: error,
    meta: {
      form
    }
  };
}

/**
 * Call the user's submit method with the form field values and dispatch actions when it is completed
 * @param   {string}    form          The form name
 * @param   {object}    values        The form values
 * @param   {function}  fn            The submit function
 * @returns {function}
 */
export function submit(form, values, fn) {
  return (dispatch) => {

    //enter the submitting state when promise doesn't resolve immediately
    const timeout = setTimeout(() => {
      dispatch({
        type: actions.SUBMIT,
        status: 'start',
        meta: {
          form
        }
      });
    }, 0);

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
            dispatch(submitError(form, result.payload));

          } else {

            //complete the submission
            dispatch({
              type: actions.SUBMIT,
              status: 'finish',
              meta: {
                form
              }
            });

          }

        },
        error => {

          //don't bother entering the submitting state when the promise resolves instantly
          clearTimeout(timeout);

          //complete the submission
          dispatch(submitError(form, error));

          throw error;
        }
      )
    ;

  };
}
