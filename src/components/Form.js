import React from 'react';
import {connect} from 'react-redux';
import {focus, blur, change, filter, validate} from '../actions/index';
import getFormFromState from '../util/getFormFromState';
import ConnectedField from './createConnectedField';

export const mapStateToProps = (state, props) => {
  const {stateKey, name: form} = props;
  return getFormFromState(stateKey, form, state);
};

export const mapDispatchToProps = (dispatch, props) => {
  const {stateKey, name: form} = props;

  return {
    initialise: (...args) => dispatch(focus(stateKey, form, ...args)),
    destroy: (...args) => dispatch(blur(stateKey, form, ...args))
  };

};

class Form extends React.Component {

  constructor(...args) {
    super(...args);
    this.fields = {};
    this.register = this.register.bind(this);
    this.unregister = this.unregister.bind(this);
  }

  register(name, component) {
    this.fields[name] = component;
  }

  unregister(name) {
    delete this.fields[name];
  }

  getChildContext() {
    return {
      formo: {

        stateKey: this.props.stateKey,

        name: this.props.name,

        filter: this.props.filter,
        validate: this.props.validate,

        register: this.register,
        unregister: this.unregister

      }
    };
  }

  render() {
    const {name, children, ...otherProps} = this.props;
    return React.Children.only(children);
  }

}

Form.childContextTypes = {
  formo: React.PropTypes.object.isRequired
};

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);

ConnectedForm.propTypes = {
  stateKey: React.PropTypes.string,

  name: React.PropTypes.string.isRequired,

  filter: React.PropTypes.func,
  validate: React.PropTypes.func

};

ConnectedForm.defaultProps = {
  stateKey: 'form',

  filter: ({value}) => value,
  validate: ({}) => true

};

export default ConnectedForm;
