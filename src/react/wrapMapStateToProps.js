import invariant from 'invariant';

const defaultFormStateKey = 'form';
const defaultformPropKey = '';
const defaultMapStateToProps = () => ({});
const defaultFormsState = {};
const defaultFormState = {fields: {}};

/**
 * Create a function to extract the form state (and any other state the user wants)
 * @param   {string}    formName
 * @param   {string}    [formStateKey]
 * @param   {string}    [formPropKey]
 * @param   {function}  [mapStateToProps]
 * @returns {Function}
 */
export default function wrapMapStateToProps({
  formName,
  formStateKey = defaultFormStateKey,
  formPropKey = defaultformPropKey,
  mapStateToProps = defaultMapStateToProps
}) {

  /**
   * Extract the form state (and any other state the user wants)
   * @param   {object} state
   * @returns {object}
   */
  return function(state = defaultFormsState) {
    let formState = null;

    if (formStateKey) {
      invariant(typeof state[formStateKey] === 'object', `redux-formo: The reducer must be mounted at "${formStateKey}".`);
      formState = state[formStateKey][formName] || defaultFormState;
    } else {
      formState = state[formName] || defaultFormState;
    }

    if (formPropKey) {
      return {...mapStateToProps(state), [formPropKey]: formState};
    } else {
      return {...mapStateToProps(state), ...formState};
    }

  };

}
