import {INITIALISE} from '../constants';
import {initialise} from '../actions';

describe.skip('initialise()', () => {

  it('should return an action', () => {

    const action = initialise(null, 'personal-details');

    expect(action).to.have.property('type', INITIALISE);

  });

});