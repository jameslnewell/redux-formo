import {DESTROY} from '../constants';

/**
 * Destroy a form
 * @param   {string}    key           The state subsection
 * @param   {string}    form          The form name
 * @returns {{type: DESTROY, meta: {form: string}}}
 */
export default function(key, form) { //TODO: test me!
  return {
    type: DESTROY,
    meta: {form}
  };
}
