import {blur as action} from '../../lib/actions';
import {blur as reducer} from '../../lib/reducer';

const initialState = {fields: {}};

describe('reducer', () => {
  describe('blur', () => {

    it('should set .active to false', () => {

      const state = reducer(initialState, action('profile', 'firstName'));

      expect(state).to.deep.equal({
        fields: {
          firstName: {
            active: false
          }
        }
      });

    });

  });
});