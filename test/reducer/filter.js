import {
  startFiltering,
  finishFiltering
} from '../../lib/reducer';

describe('reducer', () => {

  describe('startFiltering', () => {

    it('should start filtering', () => {

      const state = startFiltering({});
      expect(state).to.have.property('filtering', true);

    });

  });

  describe('finishFiltering', () => {

    it('should finish filtering', () => {

      const state = finishFiltering({}, {value: 'John'});
      expect(state).to.have.property('filtering', false);

    });

    it('should update the value', () => {

      const state = finishFiltering({}, {value: 'John'});
      expect(state).to.have.property('value', 'John');

    });

  });
});