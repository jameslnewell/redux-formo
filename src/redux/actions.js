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

    //todo: handle promise and async filtration+errors?
    const result = fn({field, value, values});

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

    //todo: handle promise and async validation+errors?
    const result = fn({field, value, values});

    dispatch({
      type: actions.VALIDATE,
      status: 'finish',
      payload: result,
      meta: {
        form,
        field
      }
    });

    return result === true;
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
    let result = null;
    try {
      result = fn({values, dispatch});
    } catch (error) {

      //don't bother entering the submitting state when the promise resolves instantly
      clearTimeout(timeout);

      //complete the submission
      dispatch({
        type: actions.SUBMIT,
        status: 'error',
        payload: error,
        meta: {
          form
        }
      });

      return Promise.resolve();
    }

    //resolve the result of the user's submit function
    return Promise.resolve(result)
      .then(
        () => {

          //don't bother entering the submitting state when the promise resolves instantly
          clearTimeout(timeout);

          //complete the submission
          dispatch({
            type: actions.SUBMIT,
            status: 'finish',
            meta: {
              form
            }
          });

        },
        (error) => {

          //don't bother entering the submitting state when the promise resolves instantly
          clearTimeout(timeout);

          //complete the submission
          dispatch({
            type: actions.SUBMIT,
            status: 'error',
            payload: error,
            meta: {
              form
            }
          });

        }
      )
    ;

  };
}
