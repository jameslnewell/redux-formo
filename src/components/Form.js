import React from 'react';
import {connect} from 'react-redux';
import {destroy, submit} from '../actions/index';
import getFormFromState from '../util/getFormFromState';

export const mapStateToProps = (state, ownProps) => {

  const key = ownProps.stateKey || 'form';
  const formName = ownProps.name;
  const formState = getFormFromState(key, formName, state);

  //calculate state
  let filtering = false;
  let validating = false;
  let valid = false;
  //FIXME: without knowing all the fields we can't validate properly?
  if (formState.fields) {
    //valid = true;
    Object.keys(formState.fields || {}).forEach(name => {
      const field = formState.fields[name];
      filtering = filtering || Boolean(field.filtering);
      validating = validating || Boolean(field.validating);
      //valid = valid && Boolean(field.valid); //FIXME: if there are no fields this is valid from the start and won't work isomorphically
    });
  }

  const props = {

    //merge the defaults
    submitting: false,
    submitted: false,

    //merge the current state
    ...formState,

    //merge the calculated state
    filtering,
    validating,
    valid

  };

  //remove the fields so we don't update the form every time a field changes
  delete props.fields;

  return props;
};

export const mapDispatchToProps = (dispatch, props) => {

  const key = props.stateKey || 'form';
  const formName = props.name;
  const submitFn = props.submit || (() => {/* do nothing */});

  return {
    submit: () => dispatch(submit(key, formName, submitFn)),
    destroy: () => dispatch(destroy(key, formName))
  };

};

class Form extends React.Component {

  constructor(...args) {
    super(...args);

    this.fields = {};

    this.register = this.register.bind(this);
    this.unregister = this.unregister.bind(this);

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

        filter: this.props.filter,
        validate: this.props.validate,

        register: this.register,
        unregister: this.unregister

      }
    };
  }

  componentWillUnmount() {
    if (this.props.destroyOnUnmount) {
      this.props.destroy();
    }
  }

  register(name, component) {
    this.fields[name] = component;
  }

  unregister(name) {
    delete this.fields[name]; //TODO: if fields are hidden they won't be included in the validation anymore???
  }

  filter() {
    return Promise.all(
      Object.keys(this.fields).map(name => this.fields[name].filter())
    );
  }

  validate() {
    return Promise.all(
      Object.keys(this.fields).map(name => this.fields[name].validate())
    );
  }

  submit() {
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

