import {change} from '../../lib/reducer';

describe('reducer', () => {
  describe('change()', () => {

    it('should set .value', () => {

      const state = change({}, {value: 'John'});
      expect(state).to.have.property('value', 'John');

    });

  });
});