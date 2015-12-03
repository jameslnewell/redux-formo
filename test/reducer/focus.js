import {FOCUS} from '../../lib/constants';
import {focus} from '../../lib/reducer';

describe('reducer', () => {
  describe('focus()', () => {

    it('should set .active to true', () => {

      const state = focus({});
      expect(state).to.have.property('active', true);

    });

  });
});