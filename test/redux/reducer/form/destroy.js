import destroy from '../../../../src/redux/reducer/form/destroy';

describe('reducer()', () => {
  describe('DESTROY', () => {

    it('should destroy the form data but leave other forms intact', () => {

      const state = destroy({
        personalDetails: {},
        paymentDetails: {}
      }, {
        meta: {
          form: 'personalDetails'
        }
      });

      expect(state).to.not.have.property('personalDetails');
      expect(state).to.have.property('paymentDetails');

    });

  });
});
