import React from 'react';
import invariant from 'invariant';
import {connect} from 'react-redux';
import * as actions from '../actions';
import getValue from '../get-value';
import getValues from '../get-values'

const MOUNT_POINT = 'form';

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
    form: formName,
    fields: fieldNames,
    values: initialValues,
    filter,
    validate,
    submit,
    filterOnBlur,
    validateOnBlur,
    filterOnSubmit,
    validateOnSubmit,
    } = {...defaultOptions, ...options};

  invariant(formName != null, 'Form must have a name');
  invariant(fieldNames != null, 'Form must have a field');

  return function(Component) {

    class FormDecorator extends React.Component {

      /**
       * Construct the form decorator component
       * @param {{}} props
       * @param {{}} context
       */
      constructor(props, context) {
        super(props, context);

        let dispatch = this.props.dispatch;

        //bind/cache the actions
        this.init = this.init.bind(this);
        this.reset = this.reset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        //bind/cache the event handlers
        this.handlers = Object.assign.apply(null, fieldNames.map(field => {
          return {[field]: {

            onFocus: () => {
              dispatch(actions.focus(formName, field))
            },

            onBlur: () => {
              dispatch(actions.blur(formName, field)) ;
              if (filterOnBlur) dispatch(actions.filter(formName, field, filter));
              if (validateOnBlur) dispatch(actions.validate(formName, field, validate));
            },

            onChange: (event) => {
              dispatch(actions.update(formName, field, event.target.value))
            }

          }};
        }).concat({}));

        //init the form
        this.init(fieldNames);

      }

      /**
       * Initialise the form fields
       * @param {Array.<string>} fields
       */
      init(fields = {}) {
        const dispatch = this.props.dispatch;
        dispatch(actions.init(formName, fields));
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
       * @param {Event} event
       */
      handleSubmit(event) {

        event.preventDefault();

        let
          valid = true,
          values = getValues(this.props),
          dispatch = this.props.dispatch
        ;

        //filter and validate each field
        fieldNames.forEach(fieldName => {
          if (filterOnSubmit) dispatch(actions.filter(formName, fieldName, filter));
          if (validateOnSubmit) valid = dispatch(actions.validate(formName, fieldName, validate)) && valid;
        });

        if (valid && submit) {
          submit(values);
        }
      }

      /**
       * Render the decorator component
       * @returns {React.Component}
       */
      render() {
        let {dispatch, ...props} = this.props;

        //mix-in the bound/cached event handlers with the field props
        props.fields = Object.assign.apply(null, fieldNames.map(fieldName => {
          let
            fieldProps = props.fields[fieldName] || {},
            fieldHandlers = this.handlers[fieldName]
          ;
          return {[fieldName]: {
            ...fieldProps,
            ...fieldHandlers
          }};
        }).concat({}));

        return <Component {...props} reset={this.reset} handleSubmit={this.handleSubmit}/>;
      }

    }

    //connect the form state from the redux store
    return connect(state => {

      if (!state[MOUNT_POINT]) {
        throw new Error ('The form reducer is not mounted at ${MOUNT_POINT}');
      }

      return state[MOUNT_POINT][formName] || {fields: {}}
    })(FormDecorator);

  };
}