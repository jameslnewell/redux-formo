
/**
 * Get the form state from the redux state
 * @param   {object} state  The redux state
 * @param   {string} key    The key of the redux-formo state in the redux state
 * @param   {string} form   The redux-formo form name
 * @returns {object}
 */
export default function(key, form, state) {
  return state[key][form];
}
