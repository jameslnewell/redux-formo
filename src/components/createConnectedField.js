import React from 'react';
import {connect} from 'react-redux';
import {initialise, focus, blur, change, filter, validate} from '../actions/index';
import getFieldFromState from '../util/getFieldFromState';

export const createMapStateToProps = options => state => {
  const key = options.stateKey || 'form';
  const formName = options.form;
  const fieldName = options.field;
  const fieldState = getFieldFromState(key, formName, fieldName, state);

  const props = {

    //merge the defaults
    active: false,
    filtering: false,
    filtered: false,
    validating: false,
    validated: false,
    valid: false,

    //merge the current state
    ...fieldState

    //merge the calculated state

  };

  //calculate state
  if (typeof fieldState.value === 'boolean') {
    props.checked = fieldState.value === true;
  }
  if (typeof fieldState.defaultValue === 'boolean') {
    props.defaultChecked = fieldState.defaultValue === true;
  }

  //FIXME: use value/defaultValue from ownProps if its the first render for isomorphic rendering

  return props;
};

export const createMapDispatchToProps = options => dispatch => {
  const {stateKey, form, field, filterFn, validateFn} = options;

  return {
    initialise: value => dispatch(initialise(stateKey, form, field, value)),
    focus: () => dispatch(focus(stateKey, form, field)),
    blur: () => dispatch(blur(stateKey, form, field)),
    change: value => dispatch(change(stateKey, form, field, value)),
    filter: () => dispatch(filter(stateKey, form, field, filterFn)),
    validate: () => dispatch(validate(stateKey, form, field, validateFn))
  };

};

/**
 * Get the field value from an input event
 * @param   {*} event
 * @returns {*}
 */
export function getValueFromEvent(event) {

  if (event && event.target) {
    const {target: {type, value, checked}} = event;

    if (type === 'checkbox') {
      return checked;
    }

    return value;
  }

  return event;
}

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

  componentWillMount() {
    if (!this.props.hasOwnProperty('value')) {
      this.props.initialise(this.props.value, this.props.defaultValue);
    }
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

    this.props.change(getValueFromEvent(event));

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

    console.log(`ConnectedField.render(${childProps.name})`);

    if (typeof Component === 'function') {
      return <Component {...childProps}/>;
    } else if (children) {
      console.log('childProps', childProps, React.Children.only(children));
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
  value: React.PropTypes.any,
  defaultValue: React.PropTypes.any,

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
