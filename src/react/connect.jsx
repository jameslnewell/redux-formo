import React from 'react';
import {connect} from 'react-redux';
import invariant from 'invariant';

import bindActionCreators from './bindActionCreators';
import wrapFormProps from './wrapFormProps';
import wrapMapStateToProps from './wrapMapStateToProps';

/**
 * The default config
 * @type {Object}
 */
const defaultConfig = {
  values: {},
  formStateKey: 'form',
  formPropKey: ''
};

const defaultMapStateToProps = () => ({});

/**
 * Connect a form component with the form state
 * @param   {Object}        config
 * @param   {string}        config.form
 * @param   {Array<string>} config.fields
 * @param   {object}        config.values
 * @param   {string}        [config.formStateKey]
 * @param   {string}        [config.formPropKey]
 * @param   {function}      [mapStateToProps]
 * @returns {function}
 */
export default function connectForm(
  config,
  mapStateToProps = defaultMapStateToProps
) {
  const finalConfig = {...defaultConfig, ...config};
  const {
    form: formName, fields: fieldNames, values: initialValues,
    formStateKey, formPropKey
  } = finalConfig;

  //ensure the form has a name
  invariant(typeof formName === 'string', `redux-formo: The form must have a name.`);

  return WrappedComponent => {

    /**
     * A connected form
     * @class
     */
    class ConnectedForm extends React.Component {

      /**
       * Construct a connected form
       * @constructor
       * @param   {object}  props
       * @param   {Array}   args
       */
      constructor(props, ...args) {
        super(props, ...args);

        //bind/cache each of the form actions for ease of use and performance
        this.actions = bindActionCreators({
          dispatch: props.dispatch,
          formName
        });

      }

      /**
       * Render the form
       * @returns {ReactElement}
       */
      render() {

        //wrap the form props; set default values for any value that is undefined in the store
        const wrappedProps = wrapFormProps({
          formPropKey,
          props: this.props,
          actions: this.actions,
          fieldNames,
          initialValues
        });

        return <WrappedComponent {...wrappedProps}/>;
      }

    }

    ConnectedForm.propTypes = {
      dispatch: React.PropTypes.func.isRequired
    };

    //connect the form component to the store
    return connect(
      wrapMapStateToProps({
        formName,
        formStateKey,
        formPropKey,
        mapStateToProps
      })
    )(ConnectedForm);

  };
}
