import filterAndValidate from './filterAndValidate';

/**
 * Get the field value from an input event
 * @param   {*} event
 * @returns {*}
 */
export function getValueFromEvent(event) {

  if (event && event.target) {
    const {target: {type, value, checked}} = event;

    if (type === 'checkbox') {
      return checked;
    }

    return value;
  }

  return event;
}

/**
 * @param   {object}  component   The form component
 * @param   {string}  fieldName   The field name
 * @returns {function}
 */
export default function(component, fieldName) {
  return event => {
    const form = component.form;
    const props = component.props;

    form.change(fieldName, getValueFromEvent(event));

    const {
      dispatch,
      filterOnChange, validateOnChange,
      filter, validate,
      afterValidate
    } = props;

    filterAndValidate({

      field: fieldName,

      filter: filterOnChange,
      filterFn: filter,
      filterAction: form.filter,

      validate: validateOnChange,
      validateFn: validate,
      validateAction: form.validate,
      afterValidate,

      dispatch,
      component

    });

  };
}
