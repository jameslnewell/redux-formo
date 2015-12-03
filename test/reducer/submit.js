import {submit} from '../../lib/reducer';

describe('reducer', () => {
  describe('focus()', () => {

    it('should set .submitted to true', () => {

      const state = submit({}, {
        field: 'firstName'
      });

      expect(state).to.have.property('submitted', true);

    });

  });
});