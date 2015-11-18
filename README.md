# the-other-redux-form

An alternate forms framework for Redux+React. 

> Warning: This project is a work in progress

## Why not `redux-form`?

- validate on blur, not change
- validate individual fields, not the whole form

## Installation

    npm install --save the-other-redux-form

## Methods

### decorate(config : object, mapStateToProps : function) : function

Returns a function to decorate your React Component to provide the form state and and some helper methods (e.g. `onSubmit`, `onChange`, `onBlur`) for handling form events.

#### config

##### form

The name of the form

##### fields 

The names of each of the form fields

##### filter 
 
A function used to filter a field value.

Optional.

Parameters:

- `fieldName` - The name of the field being filtered
- `fieldValue` - The value of the field being filtered
- `values` - All the field values

Returns:

The filtered value.

##### validate 

A function used to validate a field value.

Optional.

Parameters:

- `fieldName` - The name of the field being filtered
- `fieldValue` - The value of the field being filtered
- `values` - All the field values

Returns:

True if the value is valid. An error string if the value is not valid.

##### submit 

A function used to submit the field values.

Optional.

Parameters:

- `values` - All the field values
- `dispatch` - The dispatch method

Returns:

Void or a promise.

#### mapStateToProps

A function to map properties on your state to properties on your component.

Optional.

Parameters:

- `state` - The redux state

Returns:

The properties to pass to your component.

## The redux-form-react higher-order component injects the following properties into your component

- valid : bool
- filtering : bool
- validating : bool
- submitting : bool
- submitted : bool

- fields : object
    - &lt;name&gt; - `object`
        - **name** - `string`
        - **active** - `bool` - whether the field is currently active (i.e. focussed)
        - **filtering** - `bool` - whether the filter fn is currently running on the field
        - **validating** - `bool` - whether the validation fn is currently running on the field
        - **filtered** - `bool` - whether the field has been filtered at least once since initialisation
        - **validated** - `bool` - whether the field has been validated at least once since initialisation
        - **valid** - `bool` - whether the current value is valid 
        - **error** - `string` - the error message from the previous validation
        - **value** - `string` - the current value
        - **checked** - `bool`
        - **defaultValue** `string`
        - **defaultChecked** `bool`

## To do
- async filtering and validation
- filtering and validating properties
- dynamically adding/removing fields?
- must be mounted at `form` at the top level - can we configure the actions somehow?
