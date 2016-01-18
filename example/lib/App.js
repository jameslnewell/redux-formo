import React from 'react';
import classNames from 'classnames';
import form from '../../index';
import filter from './filter';
import validate from './validate';
import submit from './submit';

class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.handleCheckboxGroupChange = this.handleCheckboxGroupChange.bind(this);
  }

  handleCheckboxGroupChange(event) {
    let values = this.props.fields.interests.value || [];

    if (event.target.checked) {
      values.push(event.target.value);
    } else {
      values = values.filter(value => value !== event.target.value);
    }

    this.props.fields.interests.onChange(values);
  }

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
      <form className={formClassNames} onSubmit={onSubmit(submit)}>

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
            <input type="checkbox" {...interests} value="sport"
             onChange={this.handleCheckboxGroupChange}
             checked={interests.value && interests.value.indexOf('sport') !== -1}
            /> Sport
          </label>
          <label className="control__label">
            <input type="checkbox" {...interests} value="computers"
             onChange={this.handleCheckboxGroupChange}
             checked={interests.value && interests.value.indexOf('computers') !== -1}
            /> Computers
          </label>
          <label className="control__label">
            <input type="checkbox" {...interests} value="art"
             onChange={this.handleCheckboxGroupChange}
             checked={interests.value && interests.value.indexOf('art') !== -1}
            /> Art
          </label>
          <label className="control__label">
            <input type="checkbox" {...interests} value="science"
             onChange={this.handleCheckboxGroupChange}
             checked={interests.value && interests.value.indexOf('science') !== -1}
            /> Science
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

        <div>
          <h4>Values</h4>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>.defaultValue</th>
                <th>.value</th>
                <th>.lastValidValue</th>
              </tr>
            </thead>
            <tbody>
            {Object.keys(this.props.fields).map(field => {
              const fieldProps = this.props.fields[field];
              return (
                <tr key={fieldProps.name}>
                  <th>{fieldProps.name}:</th>
                  <td>{JSON.stringify(fieldProps.defaultValue)}</td>
                  <td>{JSON.stringify(fieldProps.value)}</td>
                  <td>{JSON.stringify(fieldProps.lastValidValue)}</td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>

      </form>

    );
  }

}

export default form({
  form: 'personal-details',
  fields: ['name', 'email', 'interests', 'newsletter'],
  defaults: {name: 'John', interests: ['sport'], newsletter: true},
  filter, validate
})(App);
