import React from 'react';
import {connect} from 'react-redux';

export const mapStateToProps = (state, ownProps) => {
  return state;
};

export const Field = props => {
  const {children, ...otherProps} = props;
  return React.cloneElement(children, otherProps);
};

export default connect(mapStateToProps)(Field);
