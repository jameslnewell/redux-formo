import React from 'react';
import invariant from 'invariant';
import connect from './connect';
import decorateFormProps from './decorateFormProps';
import getValuesFromProps from './getValuesFromProps';
import filterAndValidate from './filterAndValidate';
import getEventValue from './getValueFromEvent';

const defaultConfig = {

  values: {},

  filter: ({value}) => value,
  validate: () => true,

  filterOnChange: false,
  validateOnChange: false,

  filterOnBlur: true,
  validateOnBlur: true,

  filterOnSubmit: true,
  validateOnSubmit: true,

  formStateKey: 'form',
  formPropKey: '',

  destroyOnUnmount: true,

  afterValidate: () => {/* do nothing */}

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
    filter, validate,
    filterOnChange, validateOnChange,
    filterOnBlur, validateOnBlur,
    filterOnSubmit, validateOnSubmit,
    afterValidate,
    formStateKey, formPropKey,
    destroyOnUnmount
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
       * @param   {Array}   args
       */
      constructor(...args) {
        super(...args);

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

              const props = formPropKey ? this.props[formPropKey] : this.props;
              const values = getValuesFromProps({props, prop: 'value'});
              const lastValidValues = getValuesFromProps({props, prop: 'lastValidValue'});

              props.blur(fieldName);

              filterAndValidate({

                field: fieldName,
                value: values[fieldName],
                values: lastValidValues,

                filter: filterOnBlur,
                filterFn: filter,
                filterAction: props.filter,

                validate: validateOnBlur,
                validateFn: validate,
                validateAction: props.validate,
                afterValidate,

                dispatch: this.props.dispatch

              });

            },

            onChange: (event) => {

              const props = formPropKey ? this.props[formPropKey] : this.props;
              const lastValidValues = getValuesFromProps({props, prop: 'lastValidValue'});
              const eventValue = getEventValue(event);

              props.change(fieldName, eventValue);

              filterAndValidate({

                field: fieldName,
                value: eventValue,
                values: lastValidValues,

                filter: filterOnChange,
                filterFn: filter,
                filterAction: props.filter,

                validate: validateOnChange,
                validateFn: validate,
                validateAction: props.validate,
                afterValidate,

                dispatch: this.props.dispatch

              });

            }

          };

          return fieldHandlers;

        }, {});

      }

      componentWillUnmount() {
        const props = formPropKey ? this.props[formPropKey] : this.props;
        if (destroyOnUnmount) {
          props.destroy();
        }
      }

      /**
       * Create a submission handler
       * @param   {function} [submit]
       * @returns {function}
       */
      handleSubmit(submit) {
        const submitFn = submit || (() => {/*do nothing*/});

        /**
         * Handle the form submission
         * @param   {Event} event
         * @returns {void}
         */
        return event => {

          //prevent the form submitting
          if (event && event.preventDefault) {
            event.preventDefault();
          }

          let formIsValid = true;
          const props = formPropKey ? this.props[formPropKey] : this.props;
          const values = getValuesFromProps({props, prop: 'value'});
          const lastValidValues = getValuesFromProps({props, prop: 'lastValidValue'});

          //filter and validate each of the fields
          Promise.all(fieldNames.map(fieldName =>
            filterAndValidate({

              field: fieldName,
              value: values[fieldName],
              values: lastValidValues,

              filter: filterOnSubmit,
              filterFn: filter,
              filterAction: props.filter,

              validate: validateOnSubmit,
              validateFn: validate,
              validateAction: props.validate,
              afterValidate,

              dispatch: this.props.dispatch

            }).then(valid => formIsValid = formIsValid && valid)
          )).then(() => {

            //submit the valid values
            if (formIsValid) {
              props.submit(lastValidValues, submitFn);
            }

          });
        };

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

    DecoratedForm.propTypes = {
      dispatch: React.PropTypes.func.isRequired
    };

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
