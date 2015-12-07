import React from 'react';
import invariant from 'invariant';
import connect from './connect';
import decorateFormProps from './decorateFormProps';
import getValues from './getValues';

const defaultConfig = {

  values: {},

  filter: ({value}) => value,
  validate: () => true,
  submit: () => {/* do nothing */},

  filterOnChange: false,
  validateOnChange: false,

  filterOnBlur: true,
  validateOnBlur: true,

  filterOnSubmit: true,
  validateOnSubmit: true,

  formStateKey: 'form',
  formPropKey: ''

};

/**
 * Decorate a form component with basic form functionality
 * @param   {Object}    config
 * @param   {string}    config.form
 * @param   {string}    config.fields
 * @param   {object}    config.values
 * @param   {string}    [config.formStateKey]
 * @param   {string}    [config.formPropKey]
 * @param   {function}  [mapStateToProps]
 * @returns {function}
 */
export default function decorateForm(config, mapStateToProps) {
  const {
    form: formName, fields: fieldNames, values: initialValues,
    filter, validate, submit,
    filterOnBlur, validateOnBlur,
    filterOnSubmit, validateOnSubmit,
    formStateKey, formPropKey
  } = {...defaultConfig, ...config};

  invariant(formName, 'A form must have a name.');
  invariant(fieldNames && fieldNames.length, 'A form must have at least one field.');

  return WrappedComponent => {

    /**
     * A decorated form
     * @class
     */
    class DecoratedForm extends React.Component {

      /**
       * Construct a decorated form
       * @constructor
       * @param   {object}  props
       * @param   {Array}   args
       */
      constructor(props, ...args) {
        super(props, ...args);

        //bind/cache the form event handlers
        this.formHandlers = {
          onSubmit: this.handleSubmit.bind(this)
        };

        //bind/cache the field event handlers
        this.fieldHandlers = fieldNames.reduce((fieldHandlers, fieldName) => {
          fieldHandlers[fieldName] = {

            onFocus: () => {
              const props = formPropKey ? this.props[formPropKey] : this.props;
              props.focus(fieldName);
            },

            onBlur: () => {

              const
                props = formPropKey ? this.props[formPropKey] : this.props,
                fieldValues = getValues({formPropKey, props})
              ;

              props.blur(fieldName);

              //filter the value
              if (filterOnBlur) {
                fieldValues[fieldName] = props.filter(
                  fieldName, fieldValues[fieldName], fieldValues, filter //FIXME: pass validValues as fieldValues arg?
                );
              }

              //validate the value
              if (validateOnBlur) {
                props.validate(
                  fieldName, fieldValues[fieldName], fieldValues, validate //FIXME: pass validValues as fieldValues arg?
                );
              }

            },

            onChange: (event) => {
              const props = formPropKey ? this.props[formPropKey] : this.props;
              props.change(fieldName, event.target.value);
            }

          };
          return fieldHandlers;
        }, {});

      }

      /**
       * Handle the form submission
       */
      handleSubmit(event) {

        //prevent the form submitting
        if (event && event.preventDefault) {
          event.preventDefault();
        }

        const props = formPropKey ? this.props[formPropKey] : this.props;

        let
          valid = true,
          validValues = getValues({formPropKey, props})
        ;

        //filter and validate each of the fields
        fieldNames.forEach(fieldName => {

          if (filterOnSubmit)  {
            validValues[fieldName] = props.filter(
              fieldName, validValues[fieldName], validValues, filter //FIXME: pass validValues as fieldValues arg?
            );
          }

          if (validateOnSubmit) {
            valid = props.validate(
              fieldName, validValues[fieldName], validValues, validate //FIXME: pass validValues as fieldValues arg?
            ) && valid;
          }

        });

        //submit the valid values
        if (valid && submit) {
          props.submit(validValues, submit);
        }

      }

      /**
       * Render the form
       * @returns {ReactElement}
       */
      render() {

        //wrap the form props; set handlers for every field
        const decoratedProps = decorateFormProps({
          formPropKey,
          props: this.props,
          formHandlers: this.formHandlers,
          fieldHandlers: this.fieldHandlers
        });

        return <WrappedComponent {...decoratedProps}/>;
      }

    }

    //connect a form component with the form state
    return connect(
      {
        form: formName,
        fields: fieldNames,
        values: initialValues,
        formStateKey, formPropKey
      },
      mapStateToProps
    )(DecoratedForm);

  };
}
