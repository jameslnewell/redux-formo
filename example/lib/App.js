import React from 'react';
import classNames from 'classnames';
import {decorate} from '../..';
import filter from './filter';
import validate from './validate';
import submit from './submit';

class App extends React.Component {

  render() {
    let {form: {valid, submitting, submitted, error, fields: {name, phone}, onReset, onSubmit}} = this.props;

    let formClassNames = classNames('form', {'form--valid': valid, 'form--invalid': !valid});

    return (
      <form className={formClassNames} onSubmit={onSubmit}>

        <h1>About You</h1>

        {error ? <p className="control__error">{error}</p> : null}

        {name.active ? 'Valid value: ' + name.validValue + ' Value: ' + name.value : ''}
        <div className="control">
          <label className="control__label">
            Name: <input className="control__input" {...name}/>
          </label>
          {name.error ? <p className="control__error">{name.error}</p> : null}
        </div>

        <br/>
        <br/>

        {phone.active ? 'Valid value: ' + phone.validValue + ' Value: ' + phone.value : ''}
        <div className="control">
          <label className="control__label">
            Phone: <input className="control__input" {...phone}/>
          </label>
          {phone.error ? <p className="control__error">{phone.error}</p> : null}
        </div>

        <br/>
        <br/>

        <input type="submit" value={submitting ? 'Saving...' : (submitted ? 'Saved.' : 'Save')} disabled={submitting || submitted}/>
        <input type="button" onClick={onReset} value="Reset"/>

      </form>
    );
  }

}

export default decorate({
  form: 'personal-details',
  fields: ['name', 'phone'],
  filter, validate, submit
})(App);