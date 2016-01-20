
export const defaultFieldProps = {
  active: false,
  filtering: false,
  validating: false,
  filtered: false,
  validated: false,
  valid: false
};

export const defaultFormProps = {
  initialised: false,
  filtering: false,
  validating: false,
  valid: true,
  submitting: false,
  submitted: false,
  fields: {}
};

/**
 * Merge the default props for a field with the field state
 * @param   {string}  fieldName     The field name
 * @param   {object}  fieldState    The form state
 * @returns {object}
 */
export function mergeDefaultFieldPropsWithState(fieldName, fieldState) {
  const props = {
    ...defaultFieldProps,
    ...fieldState,
    name: fieldName
  };

  if (typeof fieldState.value === 'boolean') {
    props.checked = fieldState.value === true;
  }

  if (typeof fieldState.defaultValue === 'boolean') {
    props.defaultChecked = fieldState.defaultValue === true;
  }

  return props;
}

/**
 * Merge default props and handlers with the form state
 * @param   {Array<string>} fieldNames
 * @param   {object}        formState
 * @param   {object}        actions
 * @param   {object}        formHandlers
 * @param   {object}        fieldHandlers
 * @param   {object}        defaults        Only pass on construct as a hack if the form is not initialised to get around timing issues
 * @returns {object}
 */
export default function mapFormStateToProps(fieldNames, formState, actions, formHandlers, fieldHandlers, defaults = {}) {

  const formProps = {
    ...defaultFormProps,
    ...actions,
    ...formHandlers,
    ...formState
  };

  formProps.fields = fieldNames.reduce((prev, fieldName) => {
    const fieldProps = formProps.fields[fieldName] || {};

    //update the computed form values
    formProps.filtering = formProps.filtering || Boolean(fieldProps.filtering);
    formProps.validating = formProps.validating || Boolean(fieldProps.validating);
    formProps.valid = formProps.valid && Boolean(fieldProps.valid);

    //FIXME: hack to merge the defaults because the component won't receive the updated props before render() on the server
    if (!formProps.initialised && defaults[fieldName]) {
      fieldProps.value = defaults[fieldName];
      fieldProps.defaultValue = defaults[fieldName];
    }

    return {
      ...prev,
      [fieldName]: {
        ...fieldHandlers[fieldName],
        ...mergeDefaultFieldPropsWithState(
          fieldName,
          fieldProps
        )
      }
    };

  }, {});

  return formProps;
}
