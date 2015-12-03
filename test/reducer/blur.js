import {blur} from '../../lib/reducer';

describe('reducer', () => {
  describe('blur()', () => {

    it('should set .active to false', () => {

      const state = blur({});

      expect(state).to.have.property('active', false);

    });

  });
});