import {DESTROY} from '../../src/constants';
import {destroy} from '../../src/actions';

describe.skip('destroy()', () => {

  it('should return an action', () => {

    const action = destroy(null, 'personal-details');
    expect(action).to.have.property('type', DESTROY);

  });

});
