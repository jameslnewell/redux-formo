import React from 'react';
import createConnectedField from './createConnectedField';

class Field extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.connectedField = createConnectedField(context.formo, props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.name !== nextProps.name) {
      this.connectedField = createConnectedField(this.context.formo, this.props);
    }
  }

  componentWillMount() {
    this.context.formo.register(this.props.name, this);
  }

  componentWillUnmount() {
    this.context.formo.unregister(this.props.name);
  }

  render() {
    return React.createElement(this.connectedField, this.props);
  }

}

Field.contextTypes = {
  formo: React.PropTypes.object.isRequired
};

Field.propTypes = {
  name: React.PropTypes.string.isRequired
};

export default Field;
