import * as actions from '../redux/actions';

const defaultFormProps = {
  fields: {},
  filtering: false,
  validating: false,
  submitting: false,
  submitted: false,
  valid: false,
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
  error: '',
  value: '',
  validValue: '',
  defaultValue: '',
  defaultChecked: false
};

export default function wrapFormProps({fieldNames, props, formPropsKey = ''}) {

  const formProps = formPropsKey ? props[formPropsKey] : props;
  const newFormProps = {...defaultFormProps, ...formProps};

  let allFieldsAreValid = true;
  newFormProps.fields = fieldNames.reduce((wrappedFieldProps, fieldName) => {

    const fieldProps = newFormProps.fields[fieldName] || {};

    wrappedFieldProps[fieldName] = {
      ...defaultFieldProps,
      ...fieldProps
    };

    newFormProps.filtering = newFormProps.filtering || Boolean(fieldProps.filtering);
    newFormProps.validating = newFormProps.validating || Boolean(fieldProps.validating);

    allFieldsAreValid = allFieldsAreValid && Boolean(fieldProps.valid);

    return wrappedFieldProps;
  }, {});

  newFormProps.valid = allFieldsAreValid;

  //return the form props
  if (formPropsKey) {
    return {...props, [formPropsKey]: newFormProps};
  } else {
    return {...props, ...newFormProps};
  }

}