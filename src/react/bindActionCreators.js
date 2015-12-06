import * as actions from '../redux/actions';

/**
 * Bind the redux action creators with the dispatch method and form name to save the user typing
 * @param   {string}    formName
 * @param   {string}    dispatch
 * @returns {function}
 */
export default function bindActionCreators({formName, dispatch}) {
 return Object.keys(actions).reduce(
   (boundActions, action) => {
     boundActions[action] =
       (...args) => dispatch(actions[action](formName, ...args))
     ;
     return boundActions;
   },
   {}
 );
}