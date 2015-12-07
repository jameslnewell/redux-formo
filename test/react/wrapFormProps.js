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
      valid: true,
      error: ''
    });

  });

  it('should not set default form properties when properties are set', () => {

    const wrappedProps = wrapFormProps({
      fieldNames: [],
      props: {
        submitting: true,
        submitted: true,
        error: 'Uh oh!',
        fields: {}
      }
    });

    expect(wrappedProps).to.be.deep.equal({
      fields: {},
      filtering: false,
      validating: false,
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
          name: 'firstName',
          active: false,
          filtering: false,
          validating: false,
          filtered: false,
          validated: false,
          valid: false,
          error: '',
          validValue: '',
          value: '',
          checked: false,
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
        submitting: false,
        submitted: false,
        error: '',
        fields: {
          firstName: {
            active: true,
            filtering: true,
            validating: true,
            filtered: true,
            validated: true,
            valid: true,
            error: 'Uh oh!',
            validValue: 'John!',
            value: 'John!'
          }
        }
      }
    });

    expect(wrappedProps).to.be.deep.equal({
      filtering: true,
      validating: true,
      submitting: false,
      submitted: false,
      valid: true,
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
          validValue: 'John!',
          value: 'John!',
          checked: false,
          defaultValue: '',
          defaultChecked: false
        }
      }
    });

  });

  it('should set calculated property .valid', () => {

    const wrappedProps = wrapFormProps({
      fieldNames: ['firstName', 'lastName'],
      props: {
        fields: {
          firstName: {
            valid: true,
            value: 'John',
            validValue: 'John'
          },
          lastName: {
            valid: true,
            value: 'Smith',
            validValue: 'Smith'
          }
        }
      }
    });

    expect(wrappedProps).to.be.deep.equal({
      filtering: false,
      validating: false,
      submitting: false,
      submitted: false,
      valid: true,
      error: '',
      fields: {
        firstName: {
          name: 'firstName',
          active: false,
          filtering: false,
          validating: false,
          filtered: false,
          validated: false,
          valid: true,
          error: '',
          validValue: 'John',
          value: 'John',
          checked: false,
          defaultValue: '',
          defaultChecked: false
        },
        lastName: {
          name: 'lastName',
          active: false,
          filtering: false,
          validating: false,
          filtered: false,
          validated: false,
          valid: true,
          error: '',
          validValue: 'Smith',
          value: 'Smith',
          checked: false,
          defaultValue: '',
          defaultChecked: false
        }
      }
    });

  });

  it('should set calculated property .filtering and .validating', () => {

    const wrappedProps = wrapFormProps({
      fieldNames: ['firstName', 'lastName'],
      props: {
        fields: {
          firstName: {
            validating: true
          },
          lastName: {
            filtering: true
          }
        }
      }
    });

    expect(wrappedProps).to.be.deep.equal({
      filtering: true,
      validating: true,
      submitting: false,
      submitted: false,
      valid: false,
      error: '',
      fields: {
        firstName: {
          name: 'firstName',
          active: false,
          filtering: false,
          validating: true,
          filtered: false,
          validated: false,
          valid: false,
          error: '',
          validValue: '',
          value: '',
          checked: false,
          defaultValue: '',
          defaultChecked: false
        },
        lastName: {
          name: 'lastName',
          active: false,
          filtering: true,
          validating: false,
          filtered: false,
          validated: false,
          valid: false,
          error: '',
          value: '',
          validValue: '',
          checked: false,
          defaultValue: '',
          defaultChecked: false
        }
      }
    });

  });

  //TODO: test initial values
  //TODO: test actions

});