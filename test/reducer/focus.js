import {FOCUS} from '../../lib/constants';
import {focus as reducer} from '../../lib/reducer';

const initialState = {fields: {}};

describe('reducer', () => {
  describe('focus', () => {

    it('should set .active to true', () => {

      const state = reducer(initialState, {
        type: FOCUS,
        form: 'profile',
        field: 'firstName'
      });

      expect(state).to.deep.equal({
        fields: {
          firstName: {
            active: true
          }
        }
      });

    });

  });
});