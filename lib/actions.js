import * as actions from './types';
import getValue from './get-value';
import getValues from './get-values'

export function reset(form) {
  return {
    type: actions.RESET,
    form
  };
}

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
 * @param   {string}    [field]       The field name
 * @param   {function}  filter        The filtering function
 * @returns {function}
 */
export function filter(form, field, filter) {
  return (dispatch, getState) => {

    let
      state = getState().form[form],
      value = getValue(field, state),
      values = getValues(state)
    ;

    //todo: handle promise and async filtration+errors?
    let result = filter(field, value, values);

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
 * @param   {string}    [field]       The field name
 * @param   {function}  validator     The validation function
 * @returns {function}
 */
export function validate(form, field, validator) {
  return (dispatch, getState) => {

    let
      state = getState().form[form],
      value = getValue(field, state),
      values = getValues(state)
    ;

    //todo: handle promise and async validation+errors?
    let result = validator(field, value, values);

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

export function submit(form, submission) {
  return (dispatch, getState) => {

    let
      state = getState().form[form],
      values = getValues(state)
    ;

    //enter the submitting state when promise doesn't resolve immediately
    var timeout = setTimeout(() => {
      dispatch({
        type: actions.SUBMIT,
        form,
        started: true
      });
    }, 0);

    Promise.resolve(submission(values)).then(function() {

      //don't bother entering the submitting state when the promise resolves instantly
      clearTimeout(timeout);

      //complete the submission
      dispatch({
        type: actions.SUBMIT,
        form
      });

    });


  };
}