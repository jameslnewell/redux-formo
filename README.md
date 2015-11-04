# redux-form

## Why not `redux-form`?

- validate on blur, not change
- validate individual fields, not the whole form

## Installation

    npm install --save redux-form

## Usage

1.Create your app component:

    class App extends React.Component {

      handleSubmit(data) {
        console.log('Submitting', data);
      }

      render() {
        let {reset, submit, fields: {name, phone}} = this.props;
        return <form onSubmit={(event) => {event.preventDefault(); submit(this.handleSubmit.bind(this))}>

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

          <input type="submit" onClick={() => submit(this.handleSubmit.bind(this))} value="Submit"/>
          <input type="button" onClick={() => reset()} value="Reset"/>

        </form>;
      }

    }

2. Decorate your app component:


    App = formDecorator({
      form: 'personal-details',
      fields: ['name', 'phone'],
      filter: filter,
      validate: validate
    })(App);

    App = connect(state => state.form['personal-details'])(App);

3. Create your store:


    import {createStore, applyMiddleware, combineReducers} from 'redux';
    import thunk from 'redux-thunk';
    import {reducer as formReducer} from 'redux-form';

    const store = applyMiddleware(thunk)(createStore)(combineReducers({
      form: formReducer
    }));

4. Connect your store to your app component:


    import React from 'react';
    import {render} from 'react-dom';
    import {Provider} from 'react-redux'

    render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.getElementById('app')
    );

## The redux-form-react higher-order component injects the following properties into your component

- valid : bool
- submitting : bool
- validating : bool
- fields : object
    - &lt;name&gt; : object
        - value : string
        - valid : bool
        - validating : bool
        - active : bool
        - initialValue : string
        - error : string|null
        - defaultValue : string
        - defaultChecked : bool

## TODO: 
- async filtering and validation
- must be mounted at `form` at the top level - can we configure the actions somehow?
- don't require fields
- submitting, submitted, validating and validated properties
- dynamically add fields