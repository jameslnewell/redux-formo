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

  afterValidate: () => {/* do nothing */},

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
    afterValidate,
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
                values = getValues({props, prop: 'value'}),
                validValues = getValues({props, prop: 'validValue'})
              ;

              props.blur(fieldName);

              if (filterOnBlur && validateOnBlur) {

                //filter and validate
                props.filter(
                  fieldName, values[fieldName], validValues, filter
                ).then(value => {
                  return props.validate(
                    fieldName, value, validValues, validate
                  );
                }).then(valid => {
                  afterValidate({dispatch: this.props.dispatch, field: fieldName, valid, value: validValues[fieldName], values: validValues});
                })

              } else if (filterOnBlur) {

                //filter
                validValues[fieldName] = props.filter(
                  fieldName, values[fieldName], validValues, filter
                );

              } else if (validateOnBlur) {

                //validate
                props.validate(
                  fieldName, values[fieldName], validValues, validate
                ).then(valid => {
                  afterValidate({dispatch: this.props.dispatch, field: fieldName, valid, value: validValues[fieldName], values: validValues});
                });

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
          formIsValid = true,
          values = getValues({props, prop: 'value'}),
          validValues = getValues({props, prop: 'validValue'})
        ;

        //filter and validate each of the fields
        Promise.all(fieldNames.map(fieldName => {

          if (filterOnSubmit && validateOnSubmit)  {
            return props.filter(
              fieldName, values[fieldName], validValues, filter
            ).then(value => {
              return props.validate(
                fieldName, value, validValues, validate
              );
            }).then(valid => {
              formIsValid = formIsValid && valid;
              afterValidate({dispatch: this.props.dispatch, field: fieldName, valid, value: validValues[fieldName], values: validValues});
            });

          } else if (filterOnSubmit)  {

            //filter
            return values[fieldName] = props.filter(
              fieldName, values[fieldName], validValues, filter
            );

          } else if (validateOnSubmit) {

            //validate
            return props.validate(
              fieldName, values[fieldName], validValues, validate
            ).then(valid => {
              formIsValid = formIsValid && valid;
              afterValidate({dispatch: this.props.dispatch, field: fieldName, valid, value: validValues[fieldName], values: validValues});
            });

          }

        })).then(() => {

          //submit the valid values
          if (formIsValid && submit) {
            props.submit(validValues, submit);
          }

        });

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
