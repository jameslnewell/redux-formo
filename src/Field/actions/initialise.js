import {INITIALISE} from '../constants';

/**
 * Initialise a form field
 * @param   {string}    key           The state subsection
 * @param   {string}    form          The form name
 * @param   {string}    field         The field name
 * @param   {object}    value         The field value
 * @returns {object}
 */
export default function(key, form, field, value) {
  return {
    type: INITIALISE,
    meta: {
      form,
      field
    },
    value
  };
}
