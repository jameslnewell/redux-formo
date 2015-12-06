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
  formStateKey: 'form',
  formPropsKey: ''
};

const defaultMapStateToProps = state => ({});

/**
 * Connect a form component with the form state
 * @param   {Object}    config
 * @param   {string}    config.form
 * @param   {string}    [config.formStateKey]
 * @param   {string}    [config.formPropsKey]
 * @param   {function}  [mapStateToProps]
 * @returns {function}
 */
export default function connectForm(
  config,
  mapStateToProps = defaultMapStateToProps
) {
  const {form: formName} = config;

  //merge config with the default config settings
  const finalConfig = {...defaultConfig, ...config};

  //ensure the form has a name
  invariant(typeof formName === 'string', `redux-formo: The form must have a name.`);

  return WrappedComponent => {

    /**
     * A connected form
     */
    class ConnectedForm extends React.Component {

      /**
       * Construct a connected form
       * @param   {object}  props
       * @param   {Array}   args
       */
      constructor(props, ...args) {
        super(props, ...args);

        //bind/cache each of the form actions for ease of use and performance
        this.actions = bindActionCreators({
          dispatch: props.dispatch,
          formName: formName
        });

      }

      /**
       * Render the form
       * @returns {ReactElement}
       */
      render() {

        //wrap the form props; set default values for any value that is undefined in the store
        const props = wrapFormProps({
          props: this.props,
          formPropsKey: finalConfig.formPropsKey
        });

        return <WrappedComponent {...props}/>;
      }

    }

    //connect the form component to the store
    return connect(
      wrapMapStateToProps({
        formName: formName,
        formStateKey: finalConfig.formStateKey,
        formPropsKey: finalConfig.formPropsKey,
        mapStateToProps: mapStateToProps
      })
    )(ConnectedForm);

  };
}
