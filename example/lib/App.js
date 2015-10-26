import React from 'react';
import {connect} from 'react-redux';

import * as creators from '../../lib/creators';

const formName = 'personal-details';

class App extends React.Component {
  render() {
    let {dispatch, fields: {name, phone}, ...props} = this.props;
    return <div>

      <h1>Form</h1>

      {name.active ? 'name: '+name.value : ''}
      <div className="control">
        <label className="control__label">
          Name: <input className="control__input" name="name" onFocus={event => dispatch(creators.focusForm(formName, 'name'))} onBlur={event => dispatch(creators.blurForm(formName, 'name'))} onChange={event => dispatch(creators.changeForm(formName, 'name', event.target.value))}/>
        </label>
        {!name.valid ? <p className="control__error">Error!</p> : ''}
      </div>

      <br/>
      <br/>

      {phone.active ? 'phone: '+phone.value : ''}
      <div className="control">
        <label className="control__label">
          Phone: <input className="control__input" name="phone" onFocus={event => dispatch(creators.focusForm(formName, 'phone'))} onBlur={event => dispatch(creators.blurForm(formName, 'phone'))} onChange={event => dispatch(creators.changeForm(formName, 'phone', event.target.value))}/>
        </label>
        {!phone.valid ? <p className="control__error">Error!</p> : ''}
      </div>

      <br/>
      <br/>

      <input type="submit"/>

    </div>;
  }
}

export default connect(state => state)(App);