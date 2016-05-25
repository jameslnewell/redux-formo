import selectFieldState from './selectFieldState';

describe('selectFieldState()', () => {

  it('should return an empty value when the field state does not exist', () => {

    const state = selectFieldState('welcome', 'firstName')({
      form: {welcome: {fields: {}}}
    });

    expect(state).to.be.an('object');
    expect(state).to.be.deep.equal({});

  });

  it('should return an object with values when the field state exists', () => {

    const state = selectFieldState('welcome', 'firstName')({
      form: {welcome: {fields: {firstName: {valid: true, value: 'John'}}}}
    });

    expect(state).to.be.an('object');
    expect(state).to.have.property('valid', true);
    expect(state).to.have.property('value', 'John');

  });

});
