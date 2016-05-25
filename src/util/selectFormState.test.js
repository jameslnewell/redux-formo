import selectFormState from './selectFormState';

describe('selectFormState()', () => {

  it('should return an empty value when the field state does not exist', () => {

    const state = selectFormState('welcome')({
      form: {}
    });

    expect(state).to.be.an('object');
    expect(state).to.be.deep.equal({});

  });

  it('should return an object with values when the field state exists', () => {

    const state = selectFormState('welcome')({
      form: {welcome: {fields: {firstName: {valid: true, value: 'John'}}}}
    });

    expect(state).to.be.an('object');
    expect(state).to.be.deep.equal({fields: {firstName: {valid: true, value: 'John'}}});

  });

});
