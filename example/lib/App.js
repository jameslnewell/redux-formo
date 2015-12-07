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
      submitting,
      submitted,
      onSubmit,
      fields: {username, name, phone}
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

        <h1>Personal Defails</h1>

        {error && <p className="control__error">{error}</p>}

        {username.active && <small>{`Value: "${username.value}" Valid value: "${username.validValue}"`}</small>}
        <div className="control">
          <label className="control__label">
            Username: <input className="control__input" {...username} disabled={username.filtering || username.validating}/>
          </label>
          {username.error ? <p className="control__error">{username.error}</p> : null}
        </div>

        <br/>
        <br/>

        {name.active && <small>{`Value: "${name.value}" Valid value: "${name.validValue}"`}</small>}
        <div className="control">
          <label className="control__label">
            Full name: <input className="control__input" {...name}/>
          </label>
          {name.error ? <p className="control__error">{name.error}</p> : null}
        </div>

        <br/>
        <br/>

        {phone.active && <small>{`Value: "${phone.value}" Valid value: "${phone.validValue}"`}</small>}
        <div className="control">
          <label className="control__label">
            Phone: <input className="control__input" {...phone}/>
          </label>
          {phone.error && <p className="control__error">{phone.error}</p>}
        </div>

        <br/>
        <br/>

        <input
          type="submit"
          value={submitted ? 'Saved.' : (submitting ? 'Saving...' : 'Save')}
          disabled={submitting || submitted}
        />

      </form>
    );
  }

}

export default form({
  form: 'personal-details',
  fields: ['username', 'name', 'phone'],
  filter, validate, submit,
  afterValidate: (...args) => console.log(...args)
})(App);

