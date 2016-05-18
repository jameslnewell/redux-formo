import React from 'react';
import {connect} from 'react-redux';
import {focus, blur, change, filter, validate} from '../actions/index';
import getFieldFromState from '../util/getFieldFromState';

export const createMapStateToProps = options => state => {
  const key = options.stateKey || 'form';
  const formName = options.form;
  const fieldName = options.field;
  const fieldState = getFieldFromState(key, formName, fieldName, state);

  //calculate state
  let checked;
  let defaultChecked;
  if (typeof fieldState.value === 'boolean') {
    checked = fieldState.value === true;
  }
  if (typeof fieldState.defaultValue === 'boolean') {
    defaultChecked = fieldState.defaultValue === true;
  }

  const props = {

    //merge the defaults
    active: false,
    filtering: false,
    filtered: false,
    validating: false,
    validated: false,
    valid: false,

    //merge the current state
    ...fieldState,

    //merge the calculated state
    checked,
    defaultChecked

  };

  //console.log('field', props);

  return props;
};

export const createMapDispatchToProps = options => dispatch => {
  const {stateKey, form, field, filterFn, validateFn} = options;

  return {
    focus: () => dispatch(focus(stateKey, form, field)),
    blur: () => dispatch(blur(stateKey, form, field)),
    change: value => dispatch(change(stateKey, form, field, value)),
    filter: () => dispatch(filter(stateKey, form, field, filterFn)),
    validate: () => dispatch(validate(stateKey, form, field, validateFn))
  };

};

export const filterAndOrValidate = (event, props) => {
  const promise = Promise.resolve();

  if (props.filterOn === event) {
    promise.then(() => props.filter());
  }

  if (props.validateOn === event) {
    promise.then(() => props.validate());
  }

  return promise;
};

class ConnectedField extends React.Component {

  constructor(...args) {
    super(...args);

    this.filter = this.filter.bind(this);
    this.validate = this.validate.bind(this);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  filter() {
    return this.props.filter();
  }

  validate() {
    return this.props.validate();
  }

  handleFocus() {

    this.props.focus();

    filterAndOrValidate('focus', this.props);

  }

  handleChange(event) {

    this.props.change(event.target.value);

    filterAndOrValidate('change', this.props);

  }

  handleBlur() {

    this.props.blur();

    filterAndOrValidate('blur', this.props);

  }

  render() {
    const {
      children,
      component: Component,
      ...otherProps
    } = this.props;

    const childProps = {

      //state
      ...otherProps,

      //functions
      filter: this.filter,
      validate: this.validate,

      //handlers
      onFocus: this.handleFocus,
      onChange: this.handleChange,
      onBlur: this.handleBlur

    };

    console.log(`ConnectedField.render(${this.props.name})`);

    if (typeof Component === 'function') {
      return <Component {...childProps}/>;
    } else if (children) {
      return React.cloneElement(
        React.Children.only(children),
        childProps
      );
    } else {
      throw new Error('No component/children.');
    }

  }

}

ConnectedField.contextTypes = {
  formo: React.PropTypes.object.isRequired
};

ConnectedField.propTypes = {

  name: React.PropTypes.string.isRequired,

  filterOn: React.PropTypes.oneOf(['focus', 'change', 'blur']),
  validateOn: React.PropTypes.oneOf(['focus', 'change', 'blur']),

  //redux actions
  focus: React.PropTypes.func.isRequired,
  blur: React.PropTypes.func.isRequired,
  change: React.PropTypes.func.isRequired,
  filter: React.PropTypes.func.isRequired,
  validate: React.PropTypes.func.isRequired,

  children: React.PropTypes.element,
  component: React.PropTypes.func

};

ConnectedField.defaultProps = {

  filterOn: 'blur',
  validateOn: 'blur'

};

export default (options) => connect(
  createMapStateToProps(options),
  createMapDispatchToProps(options),
  null,
  {withRef: true}
)(ConnectedField);
