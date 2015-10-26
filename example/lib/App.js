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

function validate(data) {

}

App = decorator({
  form: 'personal-details',
  fields: ['name', 'phone'],
  validate: validate
})(App);

App = connect(state => state)(App);

export default App;