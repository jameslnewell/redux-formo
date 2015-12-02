import {CHANGE} from '../../lib/constants';
import {change as reducer} from '../../lib/reducer';

const initialState = {fields: {}};

describe('reducer', () => {
  describe('change', () => {

    it('should update the value', () => {

      const state = reducer(initialState, {
        type: CHANGE,
        form: 'profile',
        field: 'firstName',
        value: 'John'
      });

      expect(state).to.deep.equal({
        fields: {
          firstName: {
            value: 'John'
          }
        }
      });

    });

  });
});