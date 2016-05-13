import {BLUR} from '../../../src/redux/constants';
import {blur} from '../../../src/redux/actions';

describe('blur()', () => {

  it('should return a blur action', () => {

    const action = blur(null, 'personal-details', 'firstName');

    expect(action).to.have.property('type', BLUR);
    expect(action).to.have.property('meta').property('form', 'personal-details');
    expect(action).to.have.property('meta').property('field', 'firstName');

  });

});
