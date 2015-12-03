import * as constants from '../../lib/constants';
import reducer from '../../lib/reducer';

describe('reducer', () => {

  it('should set .value within the correct form structure', () => {

    const state = reducer({}, {
      type: constants.CHANGE,
      form: 'profile',
      field: 'firstName',
      value: 'foobar'
    });

    expect(state).to.be.deep.equal({
      profile: {
        fields: {
          firstName: {
            value: 'foobar'
          }
        }
      }
    });

  });

  it('should set .submitting within the correct form structure', () => {

    const state = reducer({}, {
      type: constants.SUBMIT,
      form: 'profile',
      status: 'start'
    });

    expect(state).to.be.deep.equal({
      profile: {
        submitting: true
      }
    });

  });

});