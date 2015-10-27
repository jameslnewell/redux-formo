import React from 'react';
import invariant from 'invariant';
import * as creator from '../creators';

const defaultOptions = {
  validator: data => {}
};

export default function(options) {
  let {form, fields, validator} = {...defaultOptions, ...options};

  invariant(form != null, 'Form must have a name');
  invariant(fields != null, 'Form must have a field');

  return function(Component) {

    class FormDecorator extends React.Component {

      constructor(props, context) {
        super(props, context);
      }

      handleSubmit() {

        //extract the data
        let data = {}, fields  = this.props.fields;
        for (let field in fields) {
          if (fields.hasOwnProperty(field)) {
            data[field] = fields[field].value;
          }
        }

        console.log('submit', data);
        Promise.resolve(validator(data)).then(function(errors) {
          console.log('errors', errors);
        });

      }

      render() {
        let {dispatch, ...props} = this.props;

        //add event handlers
        props.fields = Object.assign.apply(null, Object.keys(props.fields).map(fieldName => {
          let fieldProps = props.fields[fieldName];
          return {[fieldName]: {
            ...fieldProps,
            onFocus: event => dispatch(creator.focusForm(form, fieldName)),
            onBlur: event => dispatch(creator.blurForm(form, fieldName)),
            onChange: event => dispatch(creator.changeForm(form, fieldName, event.target.value))
          }};
        }));

        return <Component onSubmit={this.handleSubmit.bind(this)} {...props}/>;
      }

    }

    return FormDecorator;
  };
}