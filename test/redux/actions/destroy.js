import {DESTROY} from '../../../src/redux/constants';
import {destroy} from '../../../src/redux/actions';

describe.skip('destroy()', () => {

  it('should return an action', () => {

    const action = destroy(null, 'personal-details');
    expect(action).to.have.property('type', DESTROY);

  });

});
