import React from 'react';
import invariant from 'invariant';
import connect from './connect';


import * as actions from '../actions';
import getValue from '../get-value';
import getValues from '../get-values'

const defaults = {

  values: {},

  filterOnBlur: true,
  validateOnBlur: true,

  filterOnSubmit: true,
  validateOnSubmit: true,

  filter: (fieldName, fieldValue, context) => fieldValue,
  validator: (fieldName, fieldValue, context) => true,
  submit: () => {},

  mountPoint: 'form'

};

const defaultFieldProps = {
  name: '',
  active: false,
  filtering: false,
  filtered: false,
  validating: false,
  validated: false,
  valid: false,
  error: '',
  defaultValue: '',
  defaultChecked: false
};

/**
 * Decorate a form component with basic form functionality
 * @param   {Object}  options
 * @param   {string}  options.form            The form name
 * @param   {string}  [options.mountPoint]    The form mount point
 * @returns {function}
 */
export default function(options) {
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
  } = {...defaults, ...options};

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
              props.actions.focus(fieldName)
            },

            onBlur: () => {
              props.actions.blur(fieldName);
              if (filterOnBlur) props.actions.filter(fieldName, filter);
              if (validateOnBlur) props.actions.validate(fieldName, validate);
            },

            onChange: (event) => {
              const fieldValue = event.target.value;
              props.actions.change(fieldName, fieldValue)
            }

          }};
        }).concat({}));

        //initialise the form
        //props.actions.init(fieldNames);

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
          valid = true
        ;

        //let the user filter and validate each field
        fieldNames.forEach(fieldName => {
          if (filterOnSubmit) props.actions.filter(fieldName, filter);
          if (validateOnSubmit) valid = props.actions.validate(fieldName, validate) && valid;
        });

        //let the user submit the values
        if (valid && submit) {
          props.actions.submit(submit);
        }

      }

      /**
       * Render the form
       * @returns {React.Component}
       */
      render() {
        let {fields, ...props} = this.props;

        //mix-in the bound/cached event handlers with the field props
        let formValid = true;
        let decoratedFields = Object.assign.apply(null, fieldNames.map(fieldName => {

          const
            fieldProps = fields[fieldName] || {},
            fieldHandlers = this.handlers[fieldName]
          ;

          //compute whether the whole form is valid
          formValid = formValid && fieldProps.valid;

          //compute other fields
          var value = (typeof fieldProps.value === 'undefined' ? initialFieldValues[fieldName] :  fieldProps.value) || ''; //use the default value if the value hasn't been defined yet
          const computedFieldProps = {
            name: fieldName,
            value: value,
            checked: value === true,
            defaultValue: initialFieldValues[fieldName] || '',
            defaultChecked: initialFieldValues[fieldName] === true
          };

          let props = {[fieldName]: {
            ...defaultFieldProps,
            ...fieldProps,
            ...fieldHandlers,
            ...computedFieldProps
          }};

          return props;

        }).concat({}));

        let decoratedForm = Object.assign({
          valid: formValid,
          validating: false, //TODO:
          validated: false,
          submitting: false,
          submitted: false
        }, props);

        return (
          <DecoratedComponent
            {...props}
            {...decoratedForm}
            fields={decoratedFields}
            onReset={this.handleReset}
            onSubmit={this.handleSubmit}
          />
        );
      }

    }

    //connect a form component with the form state
    return connect({
      form: formName,
      mountPoint
    })(DecoratedForm);

  };
}