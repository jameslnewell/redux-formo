import {CHANGE} from '../constants';

/**
 * Change the value of a field
 * @param   {string}    key           The state subsection
 * @param   {string}    form          The form name
 * @param   {string}    field         The field name
 * @param   {string}    value         The field value
 * @returns {{type: CHANGE, meta: {form: string, field: string}, payload: string}}
 */
export default function(key, form, field, value) {
  return {
    type: CHANGE,
    meta: {
      form,
      field
    },
    payload: value
  };
}
