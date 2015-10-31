import React from 'react';
import invariant from 'invariant';
import * as actions from '../actions';
import getValue from '../get-value';
import getValues from '../get-values'

const defaultOptions = {

  values: {},

  filterOnBlur: true,
  validateOnBlur: true,

  filterOnSubmit: true,
  validateOnSubmit: true,

  filter: (field, value, context) => value,
  validator: (field, value, context) => true

};

export default function(options) {
  let {
    form,
    fields,
    values: initialValues,
    filter,
    validate,
    filterOnBlur,
    validateOnBlur,
    filterOnSubmit,
    validateOnSubmit,
  } = {...defaultOptions, ...options};

  invariant(form != null, 'Form must have a name');
  invariant(fields != null, 'Form must have a field');

  return function(Component) {

    class FormDecorator extends React.Component {

      /**
       * Construct the form decorator component
       * @param {{}} props
       * @param {{}} context
       */
      constructor(props, context) {
        super(props, context);

        //bind the methods
        this.reset = this.reset.bind(this);
        this.submit = this.submit.bind(this);

        //bind the event handlers
        let dispatch = this.props.dispatch;
        this.handlers = Object.assign.apply(null, Object.keys(props.fields).map(field => {
          return {[field]: {

            onFocus: () => {
              dispatch(actions.focus(form, field))
            },

            onBlur: () => {
              dispatch(actions.blur(form, field)) ;
              if (filterOnBlur) dispatch(actions.filter(form, field, filter));
              if (validateOnBlur) dispatch(actions.validate(form, field, validate));
            },

            onChange: (event) => {
              dispatch(actions.update(form, field, event.target.value))
            }

          }};
        }));

        //reset the form
        this.reset(initialValues);

      }

      /**
       * Reset the form fields
       * @param {{}} values
       */
      reset(values = {}) {
        const dispatch = this.props.dispatch;
        dispatch(actions.reset(values));
      }

      /**
       * Filter and validate all the form fields. If the form is valid, call the callback
       * @param {function} callback
       */
      submit(callback) {
        let
          valid = true,
          values = getValues(this.props),
          dispatch = this.props.dispatch
        ;

        //filter and validate each field
        Object.keys(values).forEach(field => {
          if (filterOnSubmit) dispatch(actions.filter(form, field, filter));
          if (validateOnSubmit) valid = dispatch(actions.validate(form, field, validate)) && valid;
        });

        console.log('VALID', valid);

        if (valid && callback) { //FIXME: doesn't validate correctly the first time?
          callback(values);
        }
      }

      /**
       * Render the decorator component
       * @returns {React.Component}
       */
      render() {
        let {dispatch, ...props} = this.props;

        //mixin event handlers
        props.fields = Object.assign.apply(null, Object.keys(props.fields).map(field => {
          let
            fieldProps = props.fields[field],
            fieldHandlers = this.handlers[field]
          ;
          return {[field]: {
            ...fieldProps,
            ...fieldHandlers
          }};
        }));

        return <Component {...props} reset={this.reset} submit={this.submit}/>;
      }

    }

    return FormDecorator;
  };
}