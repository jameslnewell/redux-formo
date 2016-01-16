import React from 'react';
import classNames from 'classnames';
import form from '../../index';
import filter from './filter';
import validate from './validate';
import submit from './submit';

class App extends React.Component {

  render() {
    const {
      valid,
      error,
      filtering,
      validating,
      submitting,
      submitted,
      onSubmit,
      fields: {
        name,
        email,
        interests,
        newsletter
      }
    } = this.props;

    const formClassNames = classNames(
      'form',
      {
        'form--valid': valid,
        'form--invalid': !valid
      }
    );

    return (
      <form className={formClassNames} onSubmit={onSubmit}>

        <h1>Personal details</h1>

        {error && <p className="control__error">{error}</p>}

        <div className="control">
          <label className="control__label">
            Full name: <input className="control__input" {...name}/>
          </label>
          {name.error ? <p className="control__error">{name.error}</p> : null}
        </div>

        <br/>
        <br/>

        <div className="control">
          <label className="control__label">
            Email: <input className="control__input" {...email}/>
          </label>
          {email.error && <p className="control__error">{email.error}</p>}
        </div>

        <br/>
        <br/>

        <div className="control">
          Interests:
          <label className="control__label">
            <input type="checkbox" {...interests}/> Sport
          </label>
          <label className="control__label">
            <input type="checkbox" {...interests}/> Computers
          </label>
          <label className="control__label">
            <input type="checkbox" {...interests}/> Art
          </label>
          <label className="control__label">
            <input type="checkbox" {...interests}/> Science
          </label>
          {interests.error && <p className="control__error">{interests.error}</p>}
        </div>

        <br/>
        <br/>

        <div className="control">
          <label className="control__label">
            <input type="checkbox" {...newsletter}/> I want to receive weekly updates
          </label>
          {newsletter.error && <p className="control__error">{newsletter.error}</p>}
        </div>

        <br/>
        <br/>

        <input
          type="submit"
          value={submitted ? 'Saved.' : (submitting ? 'Saving...' : 'Save')}
          disabled={filtering || validating || submitting || submitted}
        />

      </form>
    );
  }

}

export default form({
  form: 'personal-details',
  fields: ['name', 'email', 'interests', 'newsletter'],
  values: {name: 'John'},
  filter, validate, submit
})(App);
