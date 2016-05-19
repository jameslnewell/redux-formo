import {FOCUS} from '../constants';

/**
 * Mark a field as active
 * @param   {string}    getState      The form state
 * @param   {string}    form          The form name
 * @param   {string}    field         The field name
 * @returns {{type: FOCUS, meta: {form: string, field: string}}}
 */
export default function(getState, form, field) {
  return {
    type: FOCUS,
    meta: {
      form,
      field
    }
  };
}
