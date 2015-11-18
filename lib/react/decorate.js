import React from 'react';
import invariant from 'invariant';
import connect from './connect';

import * as actions from '../actions';
import getValues from './getValues';

const defaultConfig = {

  values: {},

  filterOnChange: false,
  validateOnChange: false,

  filterOnBlur: true,
  validateOnBlur: true,

  filterOnSubmit: true,
  validateOnSubmit: true,

  filter: (fieldName, fieldValue, context) => fieldValue,
  validate: (fieldName, fieldValue, context) => true,
  submit: () => {},

  mountPoint: 'form'

};

const defaultFormProps = {
  error: '',
  valid: false,
  validating: false,
  validated: false,
  submitting: false,
  submitted: false,
  fields: {}
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
  defaultValue: '',
  defaultChecked: false
};

/**
 * Decorate a form component with basic form functionality
 * @param   {Object}    config
 * @param   {string}    config.form             The form name
 * @param   {string}    [config.mountPoint]     The form mount point
 * @param   {function}  [mapStateToProps]       A function to map extra state to props
 * @returns {function}
 */
export default function(config, mapStateToProps) {
  let {
    form: formName,
    fields: fieldNames,
    values: initialFieldValues,
    filter,
    validate,
    submit,
    filterOnBlur,
    validateOnBlur,
    filterOnSubmit,
    validateOnSubmit,
    mountPoint
  } = {...defaultConfig, ...config};

  invariant(formName != null, 'A form must have a name.');
  invariant(fieldNames != null, 'A form must have at least one field.');

  return DecoratedComponent => {

    /**
     * A decorated form
     */
    class DecoratedForm extends React.Component {

      /**
       * Construct a decorated form
       * @param   {object}  props
       * @param   {Array}   args
       */
      constructor(props, ...args) {
        super(props, ...args);

        //bind/cache the form event handlers
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        //bind/cache the field event handlers
        this.handlers = Object.assign.apply(null, fieldNames.map(fieldName => {
          return {[fieldName]: {

            onFocus: () => {
              props.form.actions.focus(fieldName)
            },

            onBlur: () => {
              props.form.actions.blur(fieldName);

              //this is pretty hacky?
              let fieldValues = getValues(fieldNames, this.props.form.fields, initialFieldValues);

              if (filterOnBlur) {
                fieldValues[fieldName] = props.form.actions.filter(filter, fieldName, fieldValues);
              }

              if (validateOnBlur) {
                //field values might be different due to filter
                props.form.actions.validate(validate, fieldName, fieldValues);
              }

            },

            onChange: (event) => {
              const fieldValue = event.target.value;
              props.form.actions.change(fieldName, fieldValue)
            }

          }};
        }).concat({}));

      }

      componentWillMount() {
      }

      componentWillReceiveProps(nextProps) {
      }

      /**
       * Handle the form being reset
       */
      handleReset() {

      }

      /**
       * Handle the form submission
       */
      handleSubmit(event) {

        //prevent the form submitting
        if (event && event.preventDefault) {
          event.preventDefault();
        }

        let
          props = this.props,
          valid = true,
          fieldValues = getValues(fieldNames, props.form.fields, initialFieldValues)
        ;

        //let the user filter and validate each field
        fieldNames.forEach(fieldName => {

          if (filterOnSubmit)  {
            fieldValues[fieldName] = props.form.actions.filter(filter, fieldName, fieldValues);
          }

          if (validateOnSubmit) {
            valid = props.form.actions.validate(validate, fieldName, fieldValues) && valid;
          }

        });

        //let the user submit the values
        if (valid && submit) {
          props.form.actions.submit(submit, fieldValues);
        }

      }

      /**
       * Render the form
       * @returns {React.Component}
       */
      render() {
        let {form: formProps, ...props} = this.props;

        //mix-in the bound/cached event handlers with the field props
        let formValid = true;
        let decoratedFields = Object.assign.apply(null, fieldNames.map(fieldName => {

          const
            fieldProps = formProps.fields[fieldName] || {},
            fieldHandlers = this.handlers[fieldName]
          ;

          //compute whether the whole form is valid
          formValid = formValid && fieldProps.valid;

          //compute other fields
          var value = (typeof fieldProps.value === 'undefined' ? initialFieldValues[fieldName] :  fieldProps.value) || ''; //use the default value if the

          // value hasn't been defined yet
          const computedFieldProps = {
            name: fieldName,
            value: value,
            checked: value === true,
            defaultValue: initialFieldValues[fieldName] || '',
            defaultChecked: initialFieldValues[fieldName] === true
          };

          return {[fieldName]: {
            ...defaultFieldProps,
            ...fieldProps,
            ...fieldHandlers,
            ...computedFieldProps
          }};

        }).concat({}));

        const decoratedForm = Object.assign({}, defaultFormProps, formProps, {
          valid: formValid,
          fields: decoratedFields,
          onReset: this.handleReset,
          onSubmit: this.handleSubmit
        });

        return <DecoratedComponent {...props} form={decoratedForm}/>;
      }

    }

    //connect a form component with the form state
    return connect(
      {
        form: formName,
        mountPoint
      },
      mapStateToProps
    )(DecoratedForm);

  };
}