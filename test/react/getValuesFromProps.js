import getValuesFromProps from '../../src/react/getFieldValuesFromProps';

describe('getValuesFromProps()', () => {

  it('should extract values', () => {

    const values = getValuesFromProps({
      prop: 'value',
      props: {
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
      }
    });

    expect(values).to.be.deep.equal({
      firstName: 'John',
      lastName: 'Smith'
    });

  });

  it('should extract valid values', () => {

    const values = getValuesFromProps({
      prop: 'lastValidValue',
      props: {
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
      }
    });

    expect(values).to.be.deep.equal({
      firstName: 'John',
      lastName: ''
    });

  })

});