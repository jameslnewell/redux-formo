import {
  startValidating,
  finishValidating
} from '../../lib/reducer';

describe('reducer', () => {

  describe('startValidating()', () => {

    it('should set .validating to true', () => {

      const state = startValidating({});
      expect(state).to.have.property('validating', true);

    });

  });

  describe('finishValidating()', () => {

    it('should set .error when invalid', () => {

      const state = finishValidating({}, {valid: false, error: 'Uh oh!'});
      expect(state).to.have.property('error', 'Uh oh!');

    });

    it('should set .error to an empty string when valid', () => {

      const state = finishValidating({}, {valid: true});
      expect(state).to.have.property('error', '');

    });

    it('should set .validating to false when invalid', () => {

      const state = finishValidating({}, {valid: false});
      expect(state).to.have.property('validating', false);

    });

    it('should set .validating to false when valid', () => {

      const state = finishValidating({}, {valid: true});
      expect(state).to.have.property('validating', false);

    });

    it('should set .validated to true when invalid', () => {

      const state = finishValidating({}, {valid: false});
      expect(state).to.have.property('validated', true);

    });

    it('should set .validated to true when valid', () => {

      const state = finishValidating({}, {valid: true});
      expect(state).to.have.property('validated', true);

    });

    it('should set .valid to false when invalid', () => {

      const state = finishValidating({}, {valid: false});
      expect(state).to.have.property('valid', false);

    });

    it('should set .valid to true when valid', () => {

      const state = finishValidating({}, {valid: true});
      expect(state).to.have.property('valid', true);

    });

    it('should set .validValue when valid', () => {

      const state = finishValidating({value: 'John'}, {valid: true});
      expect(state).to.have.property('validValue', 'John');

    });

    it('should not set .validValue when invalid', () => {

      const state = finishValidating({value: 'John'}, {valid: false});
      expect(state).to.have.property('validValue', '');

    });

  });
});