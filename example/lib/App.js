import React from 'react';
import classNames from 'classnames';
import {decorator} from '../..';
import filter from './filter';
import validate from './validate';

class App extends React.Component {

  render() {
    let {valid, submitting, submitted, error, fields: {name, phone}, onReset, onSubmit} = this.props;

    let formClassNames = classNames('form', {'form--valid': valid, 'form--invalid': !valid});

    return (
      <form className={formClassNames} onSubmit={onSubmit}>

        <h1>About You</h1>

        {error ? <p className="control__error">{error}</p> : null}

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

        <input type="submit" value={submitting ? 'Saving...' : (submitted ? 'Saved.' : 'Save')} disabled={submitting || submitted}/>
        <input type="button" onClick={onReset} value="Reset"/>

      </form>
    );
  }

}

export default decorator({
  form: 'personal-details',
  fields: ['name', 'phone'],
  values: {name: 'James'},
  filter: filter,
  validate: validate,
  submit: function(values) {

    console.log('Submitting:', values);

    //sync errors are handled
    //throw new Error('Uh oh!');

    //async errors are handled
    //return new Promise((resolve, reject) => {
    //  setTimeout(reject.bind(null, new Error('Uh oh!')), 3000);
    //});

    //sync completion is handled
    //return;

    //async completion is handled
    //return new Promise((resolve, reject) => {
    //  setTimeout(resolve, 3000);
    //});

  }
})(App);