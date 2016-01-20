import filterAndValidate from './filterAndValidate';
import getFieldValuesFromProps from './getFieldValuesFromProps';

/**
 * @param   {object}  component   The form component
 * @param   {string}  fieldName   The field name
 * @returns {function}
 */
export default function(component, fieldName) {
  return () => {
    const form = component.form;
    const props = component.props;

    form.blur(fieldName);

    const {
      dispatch,
      filterOnBlur, validateOnBlur,
      filter, validate,
      afterValidate
    } = props;
    const lastValidValues = getFieldValuesFromProps('lastValidValue', form);

    filterAndValidate({

      field: fieldName,
      value: form.fields[fieldName].value,
      values: lastValidValues,

      filter: filterOnBlur,
      filterFn: filter,
      filterAction: form.filter,

      validate: validateOnBlur,
      validateFn: validate,
      validateAction: form.validate,
      afterValidate,

      dispatch

    });

  };
}