import {
  startFiltering,
  finishFiltering
} from '../../lib/reducer';

describe('reducer', () => {

  describe('startFiltering()', () => {

    it('should set .filtering to true', () => {

      const state = startFiltering({});
      expect(state).to.have.property('filtering', true);

    });

  });

  describe('finishFiltering()', () => {

    it('should set .value', () => {

      const state = finishFiltering({}, {value: 'John'});
      expect(state).to.have.property('value', 'John');

    });

    it('should set .filtering to false', () => {

      const state = finishFiltering({}, {value: 'John'});
      expect(state).to.have.property('filtering', false);

    });

    it('should set .filtered to true', () => {

      const state = finishFiltering({}, {value: 'John'});
      expect(state).to.have.property('filtered', true);

    });

  });
});