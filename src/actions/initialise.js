import {INITIALISE} from '../constants';

/**
 * Initialise a form
 * @param   {string}    key           The state subsection
 * @param   {string}    form          The form name
 * @param   {object}    defaults      The default values
 * @returns {{type: INITIALISE, meta: {form: string}}}
 */
export default function(key, form, defaults) { //TODO: test me!
  return {
    type: INITIALISE,
    meta: {form},
    payload: defaults
  };
}
