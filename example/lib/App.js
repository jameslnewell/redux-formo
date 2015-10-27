import React from 'react';
import {connect} from 'react-redux';

import decorator from '../../lib/react';

const formName = 'personal-details';

class App extends React.Component {

  render() {
    let {fields: {name, phone}, onSubmit} = this.props;
    return <div>

      <h1>Form</h1>

      {name.active ? 'name: '+name.value : ''}
      <div className="control">
        <label className="control__label">
          Name: <input className="control__input" {...name}/>
        </label>
        {!name.valid ? <p className="control__error">Error!</p> : ''}
      </div>

      <br/>
      <br/>

      {phone.active ? 'phone: '+phone.value : ''}
      <div className="control">
        <label className="control__label">
          Phone: <input className="control__input" {...phone}/>
        </label>
        {!phone.valid ? <p className="control__error">Error!</p> : ''}
      </div>

      <br/>
      <br/>

      <input type="submit" onClick={onSubmit}/>

    </div>;
  }

}

function filter(field, value) {

  if (field === 'phone') {
    return value.replace(/[^0-9]/g, '');
  }

  return value;
}

function validate(data) {
  let errors = {};

  if (data.name == null) {
    errors.name = 'Please enter your name so we can contact you.';
  }

  if (data.phone == null) {
    errors.phone = 'Please enter your phone number so we can contact you.';
  }

  return errors;
}

App = decorator({
  form: 'personal-details',
  fields: ['name', 'phone'],
  filter: filter,
  validate: validate
})(App);

App = connect(state => state)(App);

export default App;