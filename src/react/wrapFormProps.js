
const defaultFormProps = {
  fields: {},
  submitting: false,
  submitted: false,
  error: ''
};

const defaultFieldProps = {
  name: '',
  active: false,
  filtering: false,
  validating: false,
  filtered: false,
  validated: false,
  valid: false,
  validValue: '',
  error: '',
  value: ''
};

/**
 * @param {Array<string>} fieldNames    The field names
 * @param {object}        initialValues   The initial field values
 * @param {object}        props         The component props
 * @param {object}        actions       The form actions
 * @param {string}        formPropKey
 * @returns {object}
 */
export default function wrapFormProps({fieldNames, initialValues = {}, props, actions = {}, formPropKey = ''}) {

  const formProps = formPropKey ? props[formPropKey] : props;
  const newFormProps = {...defaultFormProps, ...formProps, ...actions};

  newFormProps.filtering = false;
  newFormProps.validating = false;
  newFormProps.valid = true;

  newFormProps.fields = fieldNames.reduce((wrappedFieldProps, fieldName) => {

    const fieldProps = newFormProps.fields[fieldName] || {};

    //use the initial value if the value hasn't already been set
    const value = (typeof fieldProps.value === 'undefined'
      ? initialValues[fieldName]
      : fieldProps.value
    ) || '';

    //combine the default, actual and computed values
    wrappedFieldProps[fieldName] = {
      ...defaultFieldProps,
      ...fieldProps,
      name: fieldName,
      value,
      checked: Boolean(value) === true
      //defaultValue: initialValues[fieldName] || '',
      //defaultChecked: Boolean(initialValues[fieldName]) === true
    };

    //update the computed form values
    newFormProps.filtering = newFormProps.filtering || Boolean(fieldProps.filtering);
    newFormProps.validating = newFormProps.validating || Boolean(fieldProps.validating);
    newFormProps.valid = newFormProps.valid && Boolean(fieldProps.valid);

    return wrappedFieldProps;
  }, {});

  if (formPropKey) {
    return {...props, [formPropKey]: newFormProps};
  } else {
    return {...props, ...newFormProps};
  }

}
