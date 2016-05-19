
/**
 * Get the form state from the redux state
 * @param   {string} key    The key of the redux-formo state in the redux state
 * @param   {string} form   The redux-formo form name
 * @param   {object} state  The redux state
 * @returns {object}
 */
export default (key = 'form') => (form, state) => {

  if (!state) {
    return {};
  }

  if (!state[key]) {
    return {};
  }

  if (!state[key][form]) {
    return {};
  }

  return state[key][form];
}
