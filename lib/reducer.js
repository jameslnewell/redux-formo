import {RESET_FORM} from './actions';
import {CHANGE_FORM} from './actions';
import {VALIDATE_FORM} from './actions';

/**
 * Create a form reducer
 * @param   {string}          formName    The name of the form
 * @param   {Array.<string>}  fieldNames  The names of the form fields
 * @returns {Function}
 */
export default function(formName, fieldNames, initialValues = {}) {

  //prob want to validate the initial values with the user's validator which means they live in middle ware
  let initialState = {
    valid: false,
    fields: Object.assign.apply(null, fieldNames.map(name => {
      return {[name]: {
        value: '',
        valid: false
      }};
    }))
  };

  return function(state = initialState, action = {}) {

    //ignore actions targetted at other forms
    if (action.formName !== formName) {
      return state;
    }

    switch (action.type) {

      case RESET_FORM:
        return initialState;

      case CHANGE_FORM:
        let {fieldName, fieldValue} = action;

        let formFields = state.fields;
        let fieldState = state.fields[fieldName];
        fieldState = {...fieldState, value: fieldValue};

        return {...state, fields: {...formFields, [fieldName]: fieldState}};

      case VALIDATE_FORM:
        return state;

      default:
        return state;

    }

  }
}