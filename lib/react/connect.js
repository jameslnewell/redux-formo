import React from 'react';
import {connect} from 'react-redux';
import invariant from 'invariant';

import * as actions from '../actions';

/**
 * The default options
 * @type {Object}
 */
const defaults = {
  mountPoint: 'form'
};

/**
 * Connect a form component with the form state
 * @param   {Object}  options
 * @param   {string}  options.form            The form name
 * @param   {string}  [options.mountPoint]    The form mount point
 * @returns {function}
 */
export default function(options) {
  const {form, mountPoint} = {...defaults, ...options};

  //assertions
  invariant(form != null, 'A form must have a name.');

  return ConnectedComponent => {

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
        this.actions = Object.assign.apply(null, Object.keys(actions).map(
          (name) => ({[name]: (...args) => props.dispatch(actions[name](form, ...args))})
        ));

      }

      /**
       * Render the form
       * @returns {React.Component}
       */
      render() {
        const {form, ...props} = this.props;
        const actions = this.actions;
        return <ConnectedComponent {...props} form={{actions, ...form}}/>
      }

    }

    /**
     * Map a subsection of the state to props on the form
     * @param   {Object} state
     * @returns {Object}
     */
    const mapStateToProps = state => {

      if (!state[mountPoint]) {
        throw new Error ('The form reducer is not mounted at ${mountPoint}');
      }

      if (!state[mountPoint][form]) {
        return {form: {fields: {}}};
      }

      return {form: state[mountPoint][form]};
    };

    //connect the form
    return connect(mapStateToProps)(ConnectedForm);
  };
}