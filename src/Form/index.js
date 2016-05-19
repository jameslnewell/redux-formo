import React from 'react';
import {connect} from 'react-redux';
import Form from './Form';
import getFormState from './getFormState';
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';

const defaultGetFormState = getFormState();

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);

ConnectedForm.propTypes = {

  name: React.PropTypes.string.isRequired,
  getState: React.PropTypes.func.isRequired,

  children: React.PropTypes.element,
  component: React.PropTypes.func,

  filter: React.PropTypes.func,
  validate: React.PropTypes.func,
  submit: React.PropTypes.func,

  destroyOnUnmount: React.PropTypes.bool

};

ConnectedForm.defaultProps = {

  getState: defaultGetFormState,

  filter: ({value}) => value,
  validate: () => true,
  submit: () => {/*do nothing*/},

  destroyOnUnmount: true

};

export default ConnectedForm;

