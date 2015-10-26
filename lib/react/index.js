import React from 'react';
import invariant from 'invariant';
import * as creator from '../creators';

export default function(options) {
  let {form, fields} = options;

  invariant(form != null, 'Form must have a name');
  invariant(fields != null, 'Form must have a field');

  return function(Component) {

    class FormDecorator extends React.Component {

      constructor(props, context) {
        super(props, context);
      }

      handleSubmit() {
        console.log('Hello!');
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