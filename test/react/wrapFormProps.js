import wrapFormProps from '../../src/react/wrapFormProps';

describe('wrapFormProps()', () => {

  it('should set default form properties when no properties are set', () => {

    const wrappedProps = wrapFormProps({
      fieldNames: [],
      props: {}
    });

    expect(wrappedProps).to.be.deep.equal({
      fields: {},
      filtering: false,
      validating: false,
      submitting: false,
      submitted: false,
      valid: false,
      error: ''
    });

  });

  it('should not set default form properties when properties are set', () => {

    const wrappedProps = wrapFormProps({
      fieldNames: [],
      props: {
        fields: {},
        filtering: true,
        validating: true,
        submitting: true,
        submitted: true,
        valid: true,
        error: 'Uh oh!'
      }
    });

    expect(wrappedProps).to.be.deep.equal({
      fields: {},
      filtering: true,
      validating: true,
      submitting: true,
      submitted: true,
      valid: true,
      error: 'Uh oh!'
    });

  });

  it('should set default field properties when no properties are set', () => {

    const wrappedProps = wrapFormProps({
      fieldNames: ['firstName'],
      props: {}
    });

    expect(wrappedProps).to.be.deep.equal({
      filtering: false,
      validating: false,
      submitting: false,
      submitted: false,
      valid: false,
      error: '',
      fields: {
        firstName: {
          name: '',
          active: false,
          filtering: false,
          validating: false,
          filtered: false,
          validated: false,
          valid: false,
          error: '',
          value: '',
          validValue: '',
          defaultValue: '',
          defaultChecked: false
        }
      }
    });

  });

  it('should not set default field properties when properties are set', () => {

    const wrappedProps = wrapFormProps({
      fieldNames: ['firstName'],
      props: {
        filtering: false,
        validating: false,
        submitting: false,
        submitted: false,
        valid: false,
        error: '',
        fields: {
          firstName: {
            name: 'firstName',
            active: true,
            filtering: true,
            validating: true,
            filtered: true,
            validated: true,
            valid: true,
            error: 'Uh oh!',
            value: 'John!',
            validValue: 'John!',
            defaultValue: 'John!',
            defaultChecked: true
          }
        }
      }
    });

    expect(wrappedProps).to.be.deep.equal({
      filtering: false,
      validating: false,
      submitting: false,
      submitted: false,
      valid: false,
      error: '',
      fields: {
        firstName: {
          name: 'firstName',
          active: true,
          filtering: true,
          validating: true,
          filtered: true,
          validated: true,
          valid: true,
          error: 'Uh oh!',
          value: 'John!',
          validValue: 'John!',
          defaultValue: 'John!',
          defaultChecked: true
        }
      }
    });

  });

  it('should set calculated properties', () => {

    const wrappedProps = wrapFormProps({
      fieldNames: ['firstName'],
      props: {}
    });

    expect(wrappedProps).to.be.deep.equal({
      filtering: false,
      validating: false,
      submitting: false,
      submitted: false,
      valid: false,
      error: '',
      fields: {
        firstName: {
          name: '',
          active: false,
          filtering: false,
          validating: false,
          filtered: false,
          validated: false,
          valid: false,
          error: '',
          value: '',
          validValue: '',
          defaultValue: '',
          defaultChecked: false
        }
      }
    });

  });

});