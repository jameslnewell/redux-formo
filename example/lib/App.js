import React from 'react';
import {decorator} from '../..';
import filter from './filter';
import validate from './validate';

class App extends React.Component {

  render() {
    let {submitted, fields: {name, phone}, onReset, onSubmit} = this.props;
    return (
      <form onSubmit={onSubmit}>

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

        <input type="submit" value="Submit" disabled={submitted}/>
        <input type="button" onClick={onReset} value="Reset"/>

      </form>
    );
  }

}

export default decorator({
  form: 'personal-details',
  fields: ['name', 'phone'],
  filter: filter,
  validate: validate,
  submit: function(values) {
    console.log('Submitted:', values);
  }
})(App);