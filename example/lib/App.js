import React from 'react';
import classNames from 'classnames';
import form from '../..';
import {Form, Field} from '../..';
import filter from './filter';
import validate from './validate';
import submit from './submit';

const logValidationResult = name => ({valid, value}) => console.log('field: ', name, 'valid='+valid, 'value='+value);

const handleCheckboxChangeForField = field => event => {
  let values = field.value || [];

  if (event.target.checked) {
    values = values.concat([event.target.value]);
  } else {
    values = values.filter(value => value !== event.target.value);
  }

  field.onChange(values);
};

const isCheckboxChecked = (field, value) => field.value && field.value.indexOf(value) !== -1;

const defaultValues = {
  username: 'jameslnewell',
  interests: ['sport']
};

class App extends React.Component {

  render() {
    return (
      <Form name="personal-details" defaultValues={defaultValues} filter={filter} validate={validate} submit={submit} component={props => (
        <form className={classNames('form', {'form--valid': props.valid, 'form--invalid': !props.valid})} onSubmit={props.onSubmit}>

        <h1>Personal details</h1>

        {props.error && <p className="control__error">{props.error}</p>}

        <Field name="username" afterValidate={logValidationResult('username')} component={
          field => (
            <div className="control">
              <label className="control__label">
                Username: <br/>
                <input className="control__input" {...field}/>
              </label>
              {field.error && <p className="control__error">{field.error}</p>}
            </div>
          )}
        />

        <br/>
        <br/>

        <Field name="email" afterValidate={logValidationResult('email')} component={
          field => (
          <div className="control">
            <label className="control__label">
              Email: <br/>
              <input className="control__input" {...field}/>
            </label>
            {field.error && <p className="control__error">{field.error}</p>}
          </div>
        )}
        />

        <br/>
        <br/>

        <Field name="interests" filterOn="change" validateOn="change" afterValidate={logValidationResult('interests')} component={
          field => (
          <div className="control">
            <div className="control__label">
              Interests: <br/>
              <label className="control__label">
                <input type="checkbox" value="sport"
                       onChange={handleCheckboxChangeForField(field)}
                       checked={isCheckboxChecked(field, 'sport')}
                /> Sport
              </label>
              <label className="control__label">
                <input type="checkbox" value="computers"
                       onChange={handleCheckboxChangeForField(field)}
                       checked={isCheckboxChecked(field, 'computers')}
                /> Computers
              </label>
              <label className="control__label">
                <input type="checkbox" value="art"
                       onChange={handleCheckboxChangeForField(field)}
                       checked={isCheckboxChecked(field, 'art')}
                /> Art
              </label>
              <label className="control__label">
                <input type="checkbox" value="science"
                       onChange={handleCheckboxChangeForField(field)}
                       checked={isCheckboxChecked(field, 'science')}
                /> Science
              </label>
            </div>
            {field.error && <p className="control__error">{field.error}</p>}
          </div>
        )}
        />

        <br/>
        <br/>

        <Field name="newsletter" filterOn="change" validateOn="change" afterValidate={logValidationResult('newsletter')} component={
          field => (
          <div className="control">
            <label className="control__label">
              Newsletter: <br/>
              <input type="checkbox" {...field} checked={field.checked}/> I want to receive weekly updates
            </label>
            {field.error && <p className="control__error">{field.error}</p>}
          </div>
        )}
        />

        <input
          type="submit"
          value={props.submitted ? 'Saved.' : (props.submitting ? 'Saving...' : 'Save')}
          disabled={props.filtering || props.validating || props.submitting || props.submitted}
        />

        </form>
      )}/>
    );
  }

}

export default App;



//<div>
//  <h4>Values</h4>
//  <table>
//    <thead>
//    <tr>
//      <th></th>
//      <th>.defaultValue</th>
//      <th>.value</th>
//    </tr>
//    </thead>
//    <tbody>
//    {Object.keys(this.props.fields).map(field => {
//      const fieldProps = this.props.fields[field];
//      return (
//        <tr key={fieldProps.name}>
//          <th>{fieldProps.name}:</th>
//          <td>{JSON.stringify(fieldProps.defaultValue)}</td>
//          <td>{JSON.stringify(fieldProps.value)}</td>
//        </tr>
//      );
//    })}
//    </tbody>
//  </table>
//</div>
