import * as actions from './types';


function getValue(field, state) {
  return state.fields[field].value;
}

function getValues(state) {
  let values = {};
  for (let field in state.fields) {
    if (state.fields.hasOwnProperty(field)) {
      values[field] = state.fields[field].value;
    }
  }
  return values;
}

export function reset(form) {
  return {
    type: actions.RESET_FORM,
    form
  };
}

export function focus(form, field) {
  return {
    type: actions.FOCUS_FORM,
    form,
    field
  };
}

export function blur(form, field) {
  return {
    type: actions.BLUR_FORM,
    form,
    field
  };
}

/**
 * Update the value of a field
 * @param   {string}    form          The form name
 * @param   {string}    field         The field name
 * @param   {string}    value         The field value
 * @returns {{type: UPDATE_FORM, form: string, field: string, value: string}}
 */
export function update(form, field, value) {
  return {
    type: actions.UPDATE_FORM,
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

    let state = getState(), value = getValue(field, state), values = getValues(state);

    dispatch({
      type: actions.FILTER_FORM,
      form,
      field,
      value: filter(field, value, values)
    });

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

    let state = getState(), value = getValue(field, state), values = getValues(state);

    dispatch({
      type: actions.VALIDATE_FORM,
      form,
      field,
      error: validator(field, value, values)
    });

  };
}
