import formReducers from './Form/reducers';
import fieldReducers from './Field/reducers';

const REDUCERS = {
  ...formReducers,
  ...fieldReducers
};

/**
 * Adds additional functionality to the reducer
 * @param   {function} target
 * @returns {function}
 */
function decorate(target) {

  /**
   * Return a new reducer that runs a set of reducers on the form state after the original reducer
   * @param   {object} reducers
   * @returns {function}
   */
  target.plugin = reducers => {
    return decorate((state = {}, action = {}) => {
      const newState = target(state, action);
      return {
        ...newState,
        ...mapValues(reducers, (reducerPlugin, formName) => reducerPlugin(newState[formName] || {}, action))
      };
    });
  };

  return target;
}

/**
 * The form reducer
 * @param   {object} state
 * @param   {object} action
 * @returns {object}
 */
function reducer(state = {}, action = {}) {
  const {type} = action;

  if (REDUCERS.hasOwnProperty(type)) {
    return REDUCERS[type](state, action);
  }

  return state;
}

export default decorate(reducer);
