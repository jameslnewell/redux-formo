import React from 'react';
import isEqual from 'lodash.isequal';

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
        getState: this.props.getState,
        name: this.props.name,
        filter: this.props.filterFn,
        validate: this.props.validateFn,
        defaults: this.props.defaultValues
      }
    };
  }

  componentWillUnmount() {
    if (this.props.destroyOnUnmount) {
      this.props.destroy();
    }
  }

  //FIXME: this can be removed when we move form filtering/validating/submitting to an action creator
  shouldComponentUpdate(nextProps) {

    //if there's new properties we should re-render
    if (Object.keys(nextProps).length !== Object.keys(this.props).length) {
      return true;
    }

    //check current properties haven't changed
    return Object.keys(nextProps).some(
      prop => !isEqual(this.props[prop], nextProps[prop])
    );

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

    //console.log('Form.render()');

    if (typeof Component === 'function') {
      return <Component {...childProps}/>;
    } else if (children) {

      const child = React.Children.only(children);

      if (React.isValidElement(child) && typeof child.type === 'string') {
        return child;
      } else {
        return React.cloneElement(
          React.Children.only(child),
          childProps
        );
      }

    } else {
      throw new Error('No component/children.');
    }

  }

}

Form.childContextTypes = {
  formo: React.PropTypes.object.isRequired
};

Form.propTypes = {

  getState: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  defaultValues: React.PropTypes.object,

  children: React.PropTypes.element,
  component: React.PropTypes.func,

  filter: React.PropTypes.func.isRequired,
  validate: React.PropTypes.func.isRequired,
  submit: React.PropTypes.func.isRequired,

  destroyOnUnmount: React.PropTypes.bool.isRequired

};

Form.defaultProps = {
  defaultValues: {},
  destroyOnUnmount: true
};

export default Form;
