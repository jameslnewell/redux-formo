import {CHANGE} from '../../../src/redux/constants';
import {change} from '../../../src/redux/actions';

describe('change()', () => {

  it('should return a change action', () => {

    const action = change(null, 'personal-details', 'firstName', 'John');

    expect(action).to.have.property('type', CHANGE);
    expect(action).to.have.property('meta').property('form', 'personal-details');
    expect(action).to.have.property('meta').property('field', 'firstName');
    expect(action).to.have.property('payload', 'John');

  });

});
