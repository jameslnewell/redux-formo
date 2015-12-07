/**
 *
 * @param {string} formPropKey
 * @param {object} props
 * @param {object} formHandlers
 * @param {object} fieldHandlers
 * @returns {object}
 */
export default function decorateFormProps({formPropKey, props, formHandlers, fieldHandlers}) {

  const formProps = formPropKey ? props[formPropKey] : props;
  const newFormProps = {...formProps, ...formHandlers};

  newFormProps.fields = Object.keys(newFormProps.fields).reduce((decoratedFieldProps, fieldName) => {
    decoratedFieldProps[fieldName] = {...decoratedFieldProps[fieldName], ...fieldHandlers[fieldName]};
    return decoratedFieldProps;
  }, newFormProps.fields);

  if (formPropKey) {
    return {...props, [formPropKey]: newFormProps};
  } else {
    return {...props, ...newFormProps};
  }

}
