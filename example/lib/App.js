import React from 'react';
import {connect} from 'react-redux';
import {decorator as formDecorator} from '../..';

class App extends React.Component {

  handleSubmit(data) {
    console.log('Submitting', data);
  }

  render() {
    let {reset, submit, fields: {name, phone}} = this.props;
    return <form onSubmit={(event) => {event.preventDefault(); submit(this.handleSubmit.bind(this))}}>

      <h1>About You</h1>

      {name.active ? 'name: '+name.value : ''}
      <div className="control">
        <label className="control__label">
          Name: <input className="control__input" {...name}/>
        </label>
        {name.error ? <p className="control__error">{name.error}</p> : null}
      </div>

      <br/>
      <br/>

      {phone.active ? 'phone: '+phone.value : ''}
      <div className="control">
        <label className="control__label">
          Phone: <input className="control__input" {...phone}/>
        </label>
        {phone.error ? <p className="control__error">{phone.error}</p> : null}
      </div>

      <br/>
      <br/>

      <input type="submit" value="Submit"/>
      <input type="button" onClick={() => reset()} value="Reset"/>

    </form>;
  }

}

function filter(field, value) {

  if (field === 'phone') {
    return value.replace(/[^0-9]/g, '');
  }

  return value;
}

function validate(field, value) {

  switch (field) {

    case 'name':

      if (value == '') {
        return 'Please enter your name so we can contact you.';
      }

      break;

    case 'phone':

      if (value == '') {
        return 'Please enter your phone number so we can contact you.';
      }

      if (!/^0[0-9]{9}$/.test(value)) {
        return 'Your phone number must consist of 10 digits starting with a 0';
      }

      break;

    default:
      break;

  }

  return true;
}

App = formDecorator({
  form: 'personal-details',
  fields: ['name', 'phone'],
  filter: filter,
  validate: validate
})(App);

App = connect(state => state.form['personal-details'])(App);

export default App;