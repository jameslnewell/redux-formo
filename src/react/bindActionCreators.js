import * as actions from '../redux/actions';

/**
 * Bind the action creators with the dispatch method and form name to save key strokes
 * @param   {string}    key
 * @param   {string}    form
 * @param   {function}  dispatch
 * @returns {function}
 */
export default function(key, form, dispatch) {
  return Object.keys(actions).reduce((boundActions, action) => {
    boundActions[action] = (...args) => dispatch(actions[action](key, form, ...args));
    return boundActions;
  }, {});
}
