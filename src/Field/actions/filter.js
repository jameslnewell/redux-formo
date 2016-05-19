import {FILTER} from '../constants';
import getFieldValue from '../../util/getFieldValue';
import getFieldValues from '../../util/getFieldValues';

function startFiltering(form, field) {
  return {
    type: FILTER,
    status: 'start',
    meta: {
      form,
      field
    }
  };
}

function finishFiltering(form, field, value) {
  return {
    type: FILTER,
    status: 'finish',
    payload: value,
    meta: {
      form,
      field
    }
  };
}

/**
 * Create a filter error action
 * @param   {string}    form          The form name
 * @param   {string}    field         The field name
 * @param   {Error}     error         The filtration error
 * @returns {{type, status: string, meta: {form: string, field: string}, payload: Error}}
 */
function errorFiltering(form, field, error) {
  return {
    type: FILTER,
    status: 'error',
    meta: {
      form,
      field
    },
    payload: error
  };
}

/**
 * Filter the form values or a single value
 * @param   {string}    getFormState  The state subsection
 * @param   {string}    form          The form name
 * @param   {string}    field         The field name
 * @param   {function}  fn            The filter function
 * @returns {function}
 */
export default function(getFormState, form, field, fn) {
  return (dispatch, getState) => {

    const formState = getFormState(form, getState());
    const value = getFieldValue(field, formState);
    const values = getFieldValues(formState);

    //enter the filtering state when promise doesn't resolve immediately
    const timeout = setTimeout(() => dispatch(startFiltering(form, field)), 0);

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
          dispatch(finishFiltering(form, field, result));

          return result;
        },
        error => {

          //don't bother entering the filtering state when the promise resolves instantly
          clearTimeout(timeout);

          //complete the filtration
          dispatch(errorFiltering(form, field, error));

          throw error;
        }
      )
      ;

  };
}
