import React from 'react';
import bindActionCreators from './bindActionCreators';
import createSubmitHandler from './createSubmitHandler';
import createFocusHandler from './createFocusHandler';
import createBlurHandler from './createBlurHandler';
import createChangeHandler from './createChangeHandler';
import mapFormStateToProps from './mapFormStateToProps';

class ReduxFormo extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);

    //bind/cache each of the form actions for ease of use and performance
    this.actions = bindActionCreators(props.name, props.dispatch);

    //bind/cache the form event handlers
    this.formHandlers = {
      onSubmit: createSubmitHandler(this)
    };

    //bind/cache the field event handlers
    this.fieldHandlers = props.fields.reduce((fieldHandlers, fieldName) => ({
      ...fieldHandlers,
      [fieldName]: {
        //TODO: form functions - filter: () => this.form.filter(field...), validate: () => this.form.validate(field...)
        onFocus: createFocusHandler(this, fieldName),
        onBlur: createBlurHandler(this,fieldName),
        onChange: createChangeHandler(this, fieldName)
      }
    }), {});

    //cache the form props
    this.form = mapFormStateToProps(
      props.fields,
      props.state,
      this.actions,
      this.formHandlers,
      this.fieldHandlers,
      props.defaults //FIXME: hack: merge the defaults because the component won't receive the updated props before render() on the server
    );

  }

  componentWillMount() {
    const {fields, defaults} = this.props;

    if (!this.form.initialised) {
      this.form.initialise(
        Object.keys(defaults) //TODO: test me! exclude any values which aren't allowed fields
          .filter(fieldName => (fields.indexOf(fieldName) !== -1))
          .reduce((prev, fieldName) => ({...prev, [fieldName]: defaults[fieldName]}))
      );
    }

  }

  componentWillUnmount() {
    const {destroyOnUnmount} = this.props;

    if (destroyOnUnmount) {
      this.form.destroy();
    }

  }

  componentWillReceiveProps(nextProps) {

    //cache the form props
    this.form = mapFormStateToProps(
      nextProps.fields,
      nextProps.state,
      this.actions,
      this.formHandlers,
      this.fieldHandlers
    );

  }

  render() {

    /*eslint-disable */
    const {
      propKey,
      name, fields, defaults,
      filter, validate,
      filterOnBlur, validateOnBlur,
      filterOnChange, validateOnChange,
      filterOnSubmit, validateOnSubmit,
      destroyOnUnmount,
      afterValidate,
      state,
      component: Component,
      ...props
    } = this.props;
    /*eslint-enable */

    let nextProps = null;
    if (propKey) {
      nextProps = {...props, [propKey]: this.form};
    } else {
      nextProps = {...props, ...this.form};
    }

    //TODO: adjust form prop name via propKey
    return (
      <Component {...nextProps}/>
    );
  }

}

ReduxFormo.propTypes = {

  propKey: React.PropTypes.string,

  name: React.PropTypes.string.isRequired,
  fields: React.PropTypes.arrayOf(React.PropTypes.string),
  defaults: React.PropTypes.object,

  filter: React.PropTypes.func,
  validate: React.PropTypes.func,

  filterOnBlur: React.PropTypes.bool,
  validateOnBlur: React.PropTypes.bool,
  filterOnChange: React.PropTypes.bool,
  validateOnChange: React.PropTypes.bool,
  filterOnSubmit: React.PropTypes.bool,
  validateOnSubmit: React.PropTypes.bool,

  destroyOnUnmount: React.PropTypes.bool,

  afterValidate: React.PropTypes.func,

  dispatch: React.PropTypes.func.isRequired,
  state: React.PropTypes.object,
  component: React.PropTypes.func.isRequired

};

ReduxFormo.defaultProps = {

  propKey: '',

  fields: [],
  defaults: {},

  filter: ({value}) => value,
  validate: () => true,

  filterOnBlur: true,
  validateOnBlur: true,
  filterOnChange: false,
  validateOnChange: false,
  filterOnSubmit: true,
  validateOnSubmit: true,

  destroyOnUnmount: true,

  afterValidate: () => {/*do nothing*/},

  state: {}

};

export default ReduxFormo;