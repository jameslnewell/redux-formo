import React from 'react';
import {connect} from 'react-redux';
import {filter, validate, destroy, submit} from '../actions/index';
import getFormFromState from '../util/getFormFromState';

export const mapStateToProps = (state, ownProps) => {

  const key = ownProps.stateKey || 'form';
  const formName = ownProps.name;
  const formState = getFormFromState(key, formName, state);

  //calculate state
  let filtering = false;
  let validating = false;
  let valid = false;
  const fieldNames = [];
  if (formState.fields) {
    valid = true;
    Object.keys(formState.fields).forEach(name => {
      const field = formState.fields[name] || {};
      fieldNames.push(field.name);
      filtering = filtering || Boolean(field.filtering);
      validating = validating || Boolean(field.validating);
      valid = valid && Boolean(field.valid);
    });
  }

  const props = {

    //rename some props
    filterFn: ownProps.filter,
    validateFn: ownProps.validate,

    //merge the defaults
    submitting: false,
    submitted: false,

    //merge the current state
    ...formState,

    //merge the calculated state
    filtering,
    validating,
    valid,

    //replace the field states with the field names so we don't update the form every time a field changes
    fields: fieldNames

  };

  return props;
};

export const mapDispatchToProps = (dispatch, ownProps) => {

  const key = ownProps.stateKey || 'form';
  const formName = ownProps.name;
  const submitFn = ownProps.submit || (() => {/* do nothing */});

  return {

    filter: field => dispatch(filter(key, formName, field, ownProps.filter)),
    validate: field => dispatch(validate(key, formName, field, ownProps.validate)),

    submit: () => dispatch(submit(key, formName, submitFn)),
    destroy: () => dispatch(destroy(key, formName))

  };

};

class Form extends React.Component {

  constructor(...args) {
    super(...args);

    this.filter = this.filter.bind(this);
    this.validate = this.validate.bind(this);
    this.submit = this.submit.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  getChildContext() {
    return {
      formo: {

        stateKey: this.props.stateKey,

        name: this.props.name,

        filter: this.props.filterFn,
        validate: this.props.validateFn

      }
    };
  }

  componentWillUnmount() {
    if (this.props.destroyOnUnmount) {
      this.props.destroy();
    }
  }

  filter() {
    //FIXME: wrap this in an action creator
    return Promise.all(
      this.props.fields.map(name => this.props.filter(name))
    );
  }

  validate() {
    //FIXME: wrap this in an action creator
    return Promise.all(
      this.props.fields.map(name => this.props.validate(name))
    );
  }

  submit() {
    //FIXME: wrap this in an action creator
    return Promise.resolve()
      .then(() => this.filter())
      .then(() => this.validate())
      .then(() => {

        if (this.props.valid) {
          return this.props.submit();
        }

      })
    ;
  }

  handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    this.submit();
  }

  render() {
    const {
      stateKey,
      name,
      destroyOnUnmount,
      filter,
      validate,
      submit,
      children,
      component: Component,
      ...otherProps
    } = this.props;

    const childProps = {


      //state
      ...otherProps,
      //TODO: calculate other state or move to reducer

      //functions
      filter: this.filter,
      validate: this.validate,
      submit: this.submit,

      //handlers
      onSubmit: this.handleSubmit

    };

    console.log('Form.render()');

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

Form.childContextTypes = {
  formo: React.PropTypes.object.isRequired
};


Form.propTypes = {
  stateKey: React.PropTypes.string,

  name: React.PropTypes.string.isRequired,

  destroyOnUnmount: React.PropTypes.bool,

  filter: React.PropTypes.func,
  validate: React.PropTypes.func,
  submit: React.PropTypes.func,

  children: React.PropTypes.element,
  component: React.PropTypes.func

};

Form.defaultProps = {

  stateKey: 'form',

  destroyOnUnmount: true,

  filter: ({value}) => value,
  validate: () => true,
  submit: () => {/*do nothing*/}

};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

