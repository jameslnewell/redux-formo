import invariant from 'invariant';

const defaultFormStateKey = 'form';
const defaultFormPropsKey = '';
const defaultMapStateToProps = state => ({});
const defaultFormsState = {};
const defaultFormState = {fields: {}};

/**
 * Create a function to extract the form state (and any other state the user wants)
 * @param   {string}    formName
 * @param   {string}    [formStateKey]
 * @param   {string}    [formPropsKey]
 * @param   {function}  [mapStateToProps]
 * @returns {Function}
 */
export default function wrapMapStateToProps({
  formName,
  formStateKey = defaultFormStateKey,
  formPropsKey = defaultFormPropsKey,
  mapStateToProps = defaultMapStateToProps
}) {

  /**
   * Extract the form state (and any other state the user wants)
   * @param   {object} state
   * @returns {object}
   */
  return function(state = defaultFormsState) {
    let formState;

    if (formStateKey) {
      invariant(typeof state[formStateKey] === 'object', `redux-formo: The reducer must be mounted at "${formStateKey}".`);
      formState = state[formStateKey][formName] || defaultFormState;
    } else {
      formState = state[formName] || defaultFormState;
    }

    if (formPropsKey) {
      return {...mapStateToProps(state), [formPropsKey]: formState};
    } else {
      return {...mapStateToProps(state), ...formState};
    }

  };

}