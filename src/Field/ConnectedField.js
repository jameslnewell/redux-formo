import React from 'react';
import getValueFromEvent from './getValueFromEvent';
import filterAndOrValidate from './filterAndOrValidate';

class ConnectedField extends React.Component {

  constructor(...args) {
    super(...args);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillMount() {
    if (!this.props.initialised) {
      this.props.initialise(this.props.value, this.props.defaultValue);
    }
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

      //handlers
      onFocus: this.handleFocus,
      onChange: this.handleChange,
      onBlur: this.handleBlur

    };

    console.log(`ConnectedField.render(${childProps.name})`);
console.log(childProps);
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
  defaultValue: '',
  filterOn: 'blur',
  validateOn: 'blur'
};

export default ConnectedField;