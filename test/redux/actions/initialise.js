import {INITIALISE} from '../../../src/redux/constants';
import {initialise} from '../../../src/redux/actions';

describe.skip('initialise()', () => {

  it('should return an action', () => {

    const action = initialise(null, 'personal-details');

    expect(action).to.have.property('type', INITIALISE);

  });

});
