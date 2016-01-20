import getFieldValuesFromProps from '../../src/react/getFieldValuesFromProps';

describe('getFieldValuesFromProps()', () => {

  it('should extract values', () => {

    const values = getFieldValuesFromProps('value', {
      fields: {
        firstName: {
          value: 'John',
          lastValidValue: 'John'
        },
        lastName: {
          value: 'Smith',
          lastValidValue: ''
        }
      }
    });

    expect(values).to.be.deep.equal({
      firstName: 'John',
      lastName: 'Smith'
    });

  });

  it('should extract valid values', () => {

    const values = getFieldValuesFromProps('lastValidValue', {
      fields: {
        firstName: {
          value: 'John',
          lastValidValue: 'John'
        },
        lastName: {
          value: 'Smith',
          lastValidValue: ''
        }
      }
    });

    expect(values).to.be.deep.equal({
      firstName: 'John',
      lastName: ''
    });

  })

});