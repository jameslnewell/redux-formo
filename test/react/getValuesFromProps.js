import getValuesFromProps from '../../src/react/getValuesFromProps';

describe('getValuesFromProps()', () => {

  it('should extract values', () => {

    const values = getValuesFromProps({
      prop: 'value',
      props: {
        fields: {
          firstName: {
            value: 'John',
            validValue: 'John'
          },
          lastName: {
            value: 'Smith',
            validValue: ''
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
      prop: 'validValue',
      props: {
        fields: {
          firstName: {
            value: 'John',
            validValue: 'John'
          },
          lastName: {
            value: 'Smith',
            validValue: ''
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