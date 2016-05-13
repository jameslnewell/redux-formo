import selectValue from '../selectValue';
import selectLastValidValues from '../selectLastValidValues';

/**
 * Filter and validate a field
 *
 * @param {string}        field           The field name
 *
 * @param {boolean}       filter          Whether the field should be filtered
 * @param {function}      filterFn        A function for filtering the field
 * @param {function}      filterAction    An action for filtering the field
 *
 * @param {boolean}       validate        Whether the field should be validated
 * @param {function}      validateFn      A function for validating the field
 * @param {function}      validateAction  An action for validating the field
 * @param {function}      afterValidate   A function to call after the field is validated
 *
 * @param {function}      dispatch
 *
 * @returns {Promise<boolean>}
 */
export default function filterAndValidate({

  field,

  filter,
  filterFn,
  filterAction,

  validate,
  validateFn,
  validateAction,
  afterValidate,

  dispatch,
  component

}) {

  const doFilter = () => filterAction(field, filterFn);

  const doValidate = () =>
    validateAction(field, validateFn)
      .then(valid => {

        const value = selectValue(field, component.form);
        const values = selectLastValidValues(component.form);

        afterValidate({
          valid,
          field,
          value,
          values,
          dispatch
        });

        return valid;

      })
  ;

  if (filter && validate) {
    return doFilter().then(doValidate);
  } else if (filter) {
    return doFilter().then(() => false);
  } else if (validate) {
    return doValidate();
  } else {
    return Promise.resolve(false);
  }
  
}
