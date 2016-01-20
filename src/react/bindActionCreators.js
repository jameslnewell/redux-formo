import * as actions from '../redux/actions';

/**
 * Bind the action creators with the dispatch method and form name to save key strokes
 * @param   {string}    formName
 * @param   {function}  dispatch
 * @returns {function}
 */
export default function(formName, dispatch) {
  return Object.keys(actions).reduce((boundActions, action) => {
    boundActions[action] = (...args) => dispatch(actions[action](formName, ...args));
    return boundActions;
  }, {});
}
