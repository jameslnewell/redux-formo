import React from 'react';
import {connect} from 'react-redux';
import {STATE_KEY} from '../constants';
import {initialise, focus, blur, change, filter, validate} from '../actions';
import getFieldFromState from '../getFieldFromState';

export const mapStateToProps = (state, ownProps) => {
  const {name} = ownProps;
  const [form, field] = name ? name.split('.', 2) : [];

  return getFieldFromState(form, field, state);
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const {name} = ownProps;
  const [form, field] = name ? name.split('.', 2) : [];

  return {
    focus: (...args) => dispatch(focus(STATE_KEY, form, field, ...args)),
    blur: (...args) => dispatch(blur(STATE_KEY, form, field, ...args)),
    change: (...args) => dispatch(change(STATE_KEY, form, field, ...args)),
    filter: (...args) => dispatch(filter(STATE_KEY, form, field, ...args)),
    validate: (...args) => dispatch(validate(STATE_KEY, form, field, ...args))
  };
};

class Field extends React.Component {

  constructor(...args) {
    super(...args);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleFocus() {
    this.props.focus();

    if (this.props.filterOn === 'focus') {
      this.props.filter(fn); //TODO: handle async
    }

    if (this.props.validateOn === 'focus') {
      this.props.validate(fn); //TODO: handle async
    }

  }

  handleChange(event) {
    this.props.change(event.target.value);

    if (this.props.filterOn === 'change') {
      this.props.filter(fn); //TODO: handle async
    }

    if (this.props.validateOn === 'change') {
      this.props.validate(fn); //TODO: handle async
    }

  }

  handleBlur() {

    this.props.blur();

    if (this.props.filterOn === 'blur') {
      this.props.filter(fn); //TODO: handle async
    }

    if (this.props.validateOn === 'blur') {
      this.props.validate(fn); //TODO: handle async
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

Field.contextTypes = {
  formo: React.PropTypes.object.isRequired
};

Field.propTypes = {

  name: React.PropTypes.string.isRequired,
  children: React.PropTypes.element.isRequired,

  focus: React.PropTypes.func.isRequired,
  blur: React.PropTypes.func.isRequired,
  change: React.PropTypes.func.isRequired,

  filterOn: React.PropTypes.oneOf(['focus', 'change', 'blur']),
  validateOn: React.PropTypes.oneOf(['focus', 'change', 'blur'])

};

Field.defaultProps = {
  filterOn: 'blur',
  validateOn: 'blur'
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
