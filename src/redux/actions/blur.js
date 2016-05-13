import {BLUR} from '../constants';

/**
 * Mark a field as inactive
 * @param   {string}    key           The state subsection
 * @param   {string}    form          The form name
 * @param   {string}    field         The field name
 * @returns {{type: BLUR, meta: {form: string, field: string}}}
 */
export default function(key, form, field) {
  return {
    type: BLUR,
    meta: {
      form,
      field
    }
  };
}
