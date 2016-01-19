import mapStateToFieldProps from './mapFieldStateToProps';

const defaultFormProps = {
  fields: {},
  filtering: false,
  validating: false,
  valid: true,
  submitting: false,
  submitted: false,
  error: undefined
};

/**
 * @param {Array<string>} fieldNames    The field names
 * @param {object}        props         The component props
 * @param {object}        actions       The form actions
 * @param {string}        formPropKey
 * @returns {object}
 */
export default function mapFormStateToProps({fieldNames, props, actions = {}, formPropKey = ''}) {

  const formProps = formPropKey ? props[formPropKey] : props;
  const newFormProps = {...defaultFormProps, ...formProps, ...actions};

  newFormProps.fields = fieldNames.reduce((wrappedFieldProps, fieldName) => {
    const fieldProps = newFormProps.fields[fieldName] || {};

    //update the computed form values
    newFormProps.filtering = newFormProps.filtering || Boolean(fieldProps.filtering);
    newFormProps.validating = newFormProps.validating || Boolean(fieldProps.validating);
    newFormProps.valid = newFormProps.valid && Boolean(fieldProps.valid);

    return {
      ...wrappedFieldProps,
      [fieldName]: mapStateToFieldProps(
        fieldName,
        fieldProps
      )
    };

  }, {});

  if (formPropKey) {
    return {...props, [formPropKey]: newFormProps};
  } else {
    return {...props, ...newFormProps};
  }

}
