import * as actions from './types';

export function focus(form, field) {
  return {
    type: actions.FOCUS,
    form,
    field
  };
}

export function blur(form, field) {
  return {
    type: actions.BLUR,
    form,
    field
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
    form,
    field,
    value
  };
}

/**
 * Filter the form values or a single value
 * @param   {string}    form          The form name
 * @param   {function}  fn            The filter function
 * @param   {string}    field         The field name
 * @param   {string}    values        The form values
 * @returns {function}
 */
export function filter(form, fn, field, values) {
  return (dispatch) => {

    let value = values[field];

    //todo: handle promise and async filtration+errors?
    let result = fn(field, value, values);

    dispatch({
      type: actions.FILTER,
      form,
      field,
      value: result
    });

    return value;
  };
}

/**
 * Validate the form values or a single value
 * @param   {string}    form          The form name
 * @param   {function}  fn            The validation function
 * @param   {string}    field         The field name
 * @param   {string}    values        The form values
 * @returns {function}
 */
export function validate(form, fn, field, values) {
  return (dispatch) => {

    let value = values[field];

    //todo: handle promise and async validation+errors?
    let result = fn(field, value, values);

    dispatch({
      type: actions.VALIDATE,
      form,
      field,
      valid: result === true,
      error: result === true ? null : result
    });

    return result === true;
  };
}

/**
 * Call the user's submit method with the form field values and dispatch actions when it is completed
 * @param   {string}    form          The form name
 * @param   {function}  fn            The submit function
 * @param   {string}    values        The form values
 * @returns {function}
 */
export function submit(form, fn, values) {
  return (dispatch) => {

    //enter the submitting state when promise doesn't resolve immediately
    var timeout = setTimeout(() => {
      dispatch({
        type: actions.SUBMIT,
        status: 'start',
        form
      });
    }, 0);

    //call the user's submit function and handle any synchronous errors
    let result = null;
    try {
      result = fn(values, dispatch);
    } catch(error) {

      //don't bother entering the submitting state when the promise resolves instantly
      clearTimeout(timeout);

      //complete the submission
      dispatch({
        type: actions.SUBMIT,
        status: 'error',
        form,
        error
      });

      //most of the time the user won't be using the promise so don't let the promise throw
      // because there's no .catch() method registered
      return Promise.reject(error).catch(error => error);
    }

    //resolve the result of the user's submit function
    return Promise.resolve(result)
      .then(() => {

        //don't bother entering the submitting state when the promise resolves instantly
        clearTimeout(timeout);

        //complete the submission
        dispatch({
          type: actions.SUBMIT,
          status: 'end',
          form
        });

      })
      .catch((error) => {

        //don't bother entering the submitting state when the promise resolves instantly
        clearTimeout(timeout);

        //complete the submission
        dispatch({
          type: actions.SUBMIT,
          status: 'error',
          form,
          error
        });

      })
    ;

  };
}