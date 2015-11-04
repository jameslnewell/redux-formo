import assert from 'assert';
import * as actions from '../lib/types';
import * as creators from '../lib/actions';
import {default as formReducer} from '../lib/reducer';

describe('reducer', () => {

  it('should return the same state when the action is targeted at another form');

  it('should return an initial state when the state is undefined', () => {
    let reducer = formReducer('about', ['name', 'phone']);
    let state = reducer();

    assert(!state.valid);

    assert(!state.fields.name.valid);
    assert.equal(state.fields.name.value, '');

    assert(!state.fields.phone.valid);
    assert.equal(state.fields.phone.value, '');

  });

  describe(actions.RESET, () => {

    it('should return the initial state');

  });

  describe(actions.UPDATE, () => {

    it('should update the value of the phone field without changing whether the field is valid', () => {
      let reducer = formReducer('about', ['name', 'phone']);
      let state = reducer(reducer(), creators.update('about', 'phone', '0466'));

      //shouldn't change the name field
      assert(!state.fields.name.valid);
      assert.equal(state.fields.name.value, '');

      assert(!state.fields.phone.valid);//shouldn't change the valid status
      assert.equal(state.fields.phone.value, '0466'); //should update the value

    });

  });

  describe(actions.VALIDATE_FORM, () => {

    it('be valid');
    it('be invalid');

  });

});