import React from 'react';
import invariant from 'invariant';
import * as creator from '../creators';

export default function(formName) {

  invariant(formName != null, 'Form must have a name');

  return function(Component) {

    class FormDecorator extends React.Component {

      constructor(props, context) {
        super(props, context);
      }

      render() {
        let {dispatch, ...props} = this.props;

        //add event handlers
        props.fields = Object.assign.apply(null, Object.keys(props.fields).map(fieldName => {
          let fieldProps = props.fields[fieldName];
          return {[fieldName]: {
            ...fieldProps,
            onFocus: event => dispatch(creator.focusForm(formName, fieldName)),
            onBlur: event => dispatch(creator.blurForm(formName, fieldName)),
            onChange: event => dispatch(creator.changeForm(formName, fieldName, event.target.value))
          }};
        }));

        return <Component {...props}/>;
      }

    }

    return FormDecorator;
  };
}