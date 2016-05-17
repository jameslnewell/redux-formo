import React from 'react';
import {connect} from 'react-redux';
import {focus, blur, change, filter, validate} from '../actions/index';
import getFieldFromState from '../util/getFieldFromState';

export const createMapStateToProps = context => (state, props) => {
  const {stateKey, name: form} = context;
  const {name: field} = props;

  return {
    form,
    ...getFieldFromState(stateKey, form, field, state)
  };
};

export const createMapDispatchToProps = context => (dispatch, props) => {
  const {stateKey, name: form} = context;
  const {name: field} = props;

  return {
    focus: (...args) => dispatch(focus(stateKey, form, field, ...args)),
    blur: (...args) => dispatch(blur(stateKey, form, field, ...args)),
    change: (...args) => dispatch(change(stateKey, form, field, ...args)),
    filter: (...args) => dispatch(filter(stateKey, form, field, ...args)),
    validate: (...args) => dispatch(validate(stateKey, form, field, ...args))
  };

};

class ConnectedField extends React.Component {

  constructor(...args) {
    super(...args);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleFocus() {
    const {focus, filter, validate, filterOn, validateOn} = this.props;
    const {formo: {filter: filterFn, validate: validateFn}} = this.context;

    focus();

    filterAndOrValidate(props, context);

    if (filterOn === 'focus') {
      filter(filterFn); //TODO: handle async
    }

    if (validateOn === 'focus') {
      validate(validateFn); //TODO: handle async
    }

  }

  handleChange(event) {
    const {change, filter, validate, filterOn, validateOn} = this.props;
    const {formo: {filter: filterFn, validate: validateFn}} = this.context;

    change(event.target.value); //TODO: handle different types of values

    if (filterOn === 'change') {
      filter(filterFn); //TODO: handle async
    }

    if (validateOn === 'change') {
      validate(validateFn); //TODO: handle async
    }

  }

  handleBlur() {
    const {blur, filter, validate, filterOn, validateOn} = this.props;
    const {formo: {filter: filterFn, validate: validateFn}} = this.context;

    blur();

    if (filterOn === 'blur') {
      filter(filterFn); //TODO: handle async
    }

    if (validateOn === 'blur') {
      validate(validateFn); //TODO: handle async
    }

  }

  render() {
    const {children, ...otherProps} = this.props;

    const childProps = {

      ...otherProps,

      onFocus: this.handleFocus,
      onChange: this.handleChange,
      onBlur: this.handleBlur

    };

    return React.cloneElement(React.Children.only(children), childProps);
  }

}

ConnectedField.contextTypes = {
  formo: React.PropTypes.object.isRequired
};

ConnectedField.propTypes = {

  form: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  children: React.PropTypes.element.isRequired,

  filterOn: React.PropTypes.oneOf(['focus', 'change', 'blur']),
  validateOn: React.PropTypes.oneOf(['focus', 'change', 'blur']),

  //redux actions
  focus: React.PropTypes.func.isRequired,
  blur: React.PropTypes.func.isRequired,
  change: React.PropTypes.func.isRequired,
  filter: React.PropTypes.func.isRequired,
  validate: React.PropTypes.func.isRequired

};

ConnectedField.defaultProps = {

  filterOn: 'blur',
  validateOn: 'blur'

};

export default (context, props) => {
  return connect(
    createMapStateToProps(context),
    createMapDispatchToProps(context)
  )(ConnectedField);
};
