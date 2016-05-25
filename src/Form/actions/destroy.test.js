import {DESTROY} from '../constants';
import destroy from '../actions/destroy';


describe.skip('destroy()', () => {

  it('should return an action', () => {

    const action = destroy(null, 'personal-details');
    expect(action).to.have.property('type', DESTROY);

  });

});
