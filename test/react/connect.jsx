import connect from '../../src/react/connect';

describe('connect()', () => {

  it('should throw when the form has no name', () => {
    expect(() => connect({})(<form></form>)).to.throw();
  });

});