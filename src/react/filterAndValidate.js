/**
 * Filter and validate a field
 *
 * @param {string}        field           The field name
 * @param {string}        value           The field value
 * @param {Array<string>} values          The valid form values
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
  value,
  values,

  filter,
  filterFn,
  filterAction,

  validate,
  validateFn,
  validateAction,
  afterValidate,

  dispatch

}) {

  const doFilter = () => filterAction(field, value, values, filterFn);

  const doValidate = (filteredValue) =>
    validateAction(field, filteredValue, values, validateFn)
      .then(valid => {

        const validValues = values;
        if (valid) {
          validValues[field] = filteredValue;
        }

        afterValidate({
          valid,
          field,
          value: filteredValue,
          values: validValues,
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
    return doValidate(value);
  } else {
    return Promise.resolve(false);
  }
  
}
