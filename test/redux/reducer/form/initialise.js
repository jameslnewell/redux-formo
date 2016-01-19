import initialise from '../../../../src/redux/reducer/form/initialise';

describe('reducer()', () => {
  describe('INITIALISE', () => {

    it('should set .initialised when the form state is uninitialised', () => {

      const state = initialise({}, {
        payload: {
          firstName: 'John',
          lastName: 'Smith'
        }
      });

      expect(state).to.have.property('initialised', true);

    });

    it('should set fields\' .value when the form state is uninitialised', () => {

      const state = initialise({}, {
        payload: {
          firstName: 'John',
          lastName: 'Smith'
        }
      });

      expect(state.fields.firstName).to.have.property('value', 'John');
      expect(state.fields.lastName).to.have.property('value', 'Smith');

    });

    it('should set fields\' .defaultValue when the form state is uninitialised', () => {

      const state = initialise({}, {
        payload: {
          firstName: 'John',
          lastName: 'Smith'
        }
      });

      expect(state.fields.firstName).to.have.property('defaultValue', 'John');
      expect(state.fields.lastName).to.have.property('defaultValue', 'Smith');

    });

  });
});
