import React from 'react';
import {connect} from 'react-redux';
import invariant from 'invariant';
import ReduxFormo from './ReduxFormo';

/**
 * The default config
 * @type {Object}
 */
const defaultConfig = {
  formStateKey: 'form'
};

/**
 * Connect a form component with the form state
 * @param   {Object}        config
 * @param   {string}        config.name
 * @param   {Array<string>} config.fields
 * @param   {object}        config.defaults
 * @param   {string}        [config.formStateKey]
 * @param   {function}      [mapStateToProps]
 * @returns {function}
 */
export default function( //TODO: test me!
  config,
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options
) {
  const mergedConfig = {...defaultConfig, ...config};
  const {name, formStateKey, ...otherConfig} = mergedConfig;

  //ensure the form has a name
  invariant(
    typeof name === 'string' && name.length > 0,
    `redux-formo: The form must have a name.`
  );

  //connect the form component to the store
  return component =>
    connect(
      state => {
        const extraProps = {name, component, ...otherConfig};

        //extract the form state
        let formState = null;
        if (formStateKey) {
          invariant(typeof state[formStateKey] === 'object', `redux-formo: The reducer must be mounted at "${formStateKey}".`);
          formState = state[formStateKey][name] || {};
        } else {
          formState = state[name] || {};
        }

        //run the user's mapStateToProps function and merge any extra state that the user has extracted
        if (mapStateToProps) {
          return {state: formState, ...mapStateToProps(state), ...extraProps};
        } else {
          return {state: formState, ...extraProps};
        }

      },
      mapDispatchToProps,
      mergeProps,
      options
    )(ReduxFormo)
  ;

}
