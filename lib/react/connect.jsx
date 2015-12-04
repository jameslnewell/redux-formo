import React from 'react';
import {connect} from 'react-redux';
import invariant from 'invariant';

import * as actions from '../redux/actions';

/**
 * The default options
 * @type {Object}
 */
const defaults = {
  mountPoint: 'form'
};

/**
 * Connect a form component with the form state
 * @param   {Object}    config
 * @param   {string}    config.form            The form name
 * @param   {string}    [config.mountPoint]    The form mount point
 * @param   {function}  [mapStateToProps]
 * @returns {function}
 */
export default function connectForm(config, mapStateToProps) {

  //merge the default properties
  config = {...defaults, ...config};
  mapStateToProps = mapStateToProps || (state => ({}));

  //assertions
  const {form, mountPoint} = config;
  invariant(form != null, 'A form must have a name.');


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

        //bind/cache all of the form actions
        this.actions = Object.keys(actions).reduce(
          (boundActions, action) => {
            boundActions[action] =
              (...args) => props.dispatch(actions[action](form, ...args))
            ;
            return boundActions;
          },
          {}
        );

      }

      /**
       * Render the form
       * @returns {ReactElement}
       */
      render() {
        const {form, ...props} = this.props;
        return <WrappedComponent {...props} form={{...(this.actions), ...form}}/>
      }

    }

    /**
     * Map a subsection of the state to props on the form
     * @param   {Object} state
     * @returns {Object}
     */
    const formMapStateToProps = state => {

      if (!state[mountPoint]) {
        throw new Error (`The form reducer is not mounted at ${mountPoint}`);
      }

      if (!state[mountPoint][form]) {
        return {form: {fields: {}}, ...mapStateToProps(state)};
      }

      return {form: state[mountPoint][form], ...mapStateToProps(state)};
    };

    //connect the form
    return connect(formMapStateToProps)(ConnectedForm);
  };
}