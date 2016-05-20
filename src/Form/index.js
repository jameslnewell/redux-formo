import React from 'react';
import {connect} from 'react-redux';
import Form from './Form';
import getFormState from './getFormState';
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';

const defaultGetFormState = getFormState();

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);

//props required by mapStateToProps() and mapDispatchToProps()
ConnectedForm.propTypes = {

  name: React.PropTypes.string.isRequired,

  getState: React.PropTypes.func.isRequired,

  filter: React.PropTypes.func,
  validate: React.PropTypes.func,
  submit: React.PropTypes.func

};

ConnectedForm.defaultProps = {

  getState: defaultGetFormState,

  filter: ({value}) => value,
  validate: () => true,
  submit: () => {/*do nothing*/}

};

export default ConnectedForm;

