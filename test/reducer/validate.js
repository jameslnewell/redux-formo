import {
  startValidating,
  finishValidating
} from '../../lib/reducer';

describe('reducer', () => {

  describe('startValidating', () => {

    it('should start validating', () => {

      const state = startValidating({});
      expect(state).to.have.property('validating', true);

    });

  });

  describe('finishValidating', () => {

    it('should finish validating', () => {

      const state = finishValidating({}, {value: 'John'});
      expect(state).to.have.property('validating', false);

    });

    it('should update the error', () => {

      const state = finishValidating({}, {value: 'John'});
      expect(state).to.have.property('value', 'John');

    });

  });
});