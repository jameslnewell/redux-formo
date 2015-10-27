import React from 'react';
import invariant from 'invariant';
import * as actions from '../actions';

const defaultOptions = {
  filter: (field, value, context) => value,
  validator: (field, value, context) => null,
  filterOnBlur: true,
  validateOnBlur: true
};

export default function(options) {
  let {form, fields, filter, validate, filterOnBlur, validateOnBlur} = {...defaultOptions, ...options};

  invariant(form != null, 'Form must have a name');
  invariant(fields != null, 'Form must have a field');

  return function(Component) {

    class FormDecorator extends React.Component {

      constructor(props, context) {
        super(props, context);
      }

      handleSubmit() {

        //extract the data
        let values = {}, fields = this.props.fields;
        for (let field in fields) {
          if (fields.hasOwnProperty(field)) {
            values[field] = fields[field].value;
          }
        }

        console.log('submit', values);
      }

      render() {
        let {dispatch, ...props} = this.props;

        //add event handlers
        props.fields = Object.assign.apply(null, Object.keys(props.fields).map(field => {
          let fieldProps = props.fields[field];
          return {[field]: {
            ...fieldProps,

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

        return <Component onSubmit={this.handleSubmit.bind(this)} {...props}/>;
      }

    }

    return FormDecorator;
  };
}