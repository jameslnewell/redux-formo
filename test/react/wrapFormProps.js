import wrapFormProps from '../../src/react/wrapFormProps';

describe('wrapFormProps()', () => {

  describe('=> when .formPropKey is empty', () => {

    it('should set default form properties when no properties are set', () => {

      const wrappedProps = wrapFormProps({
        fieldNames: [],
        props: {}
      });

      expect(wrappedProps).to.have.property('fields');
      expect(wrappedProps).to.have.property('submitting', false);
      expect(wrappedProps).to.have.property('submitted', false);
      expect(wrappedProps).to.have.property('error', '');

    });

    it('should not set default form properties when properties are set', () => {

      const wrappedProps = wrapFormProps({
        fieldNames: [],
        props: {
          fields: {},
          submitting: true,
          submitted: true,
          error: 'Uh oh!'
        }
      });

      expect(wrappedProps).to.have.property('fields');
      expect(wrappedProps).to.have.property('submitting', true);
      expect(wrappedProps).to.have.property('submitted', true);
      expect(wrappedProps).to.have.property('error', 'Uh oh!');

    });

    it('should set default field properties when no properties are set', () => {

      const wrappedProps = wrapFormProps({
        fieldNames: ['firstName'],
        props: {}
      });

      expect(wrappedProps.fields.firstName).to.have.property('active', false);
      expect(wrappedProps.fields.firstName).to.have.property('filtering', false);
      expect(wrappedProps.fields.firstName).to.have.property('validating', false);
      expect(wrappedProps.fields.firstName).to.have.property('filtered', false);
      expect(wrappedProps.fields.firstName).to.have.property('validated', false);
      expect(wrappedProps.fields.firstName).to.have.property('valid', false);
      expect(wrappedProps.fields.firstName).to.have.property('validValue', '');
      expect(wrappedProps.fields.firstName).to.have.property('error', '');

    });

    it('should not set default field properties when properties are set', () => {

      const wrappedProps = wrapFormProps({
        fieldNames: ['firstName'],
        props: {
          fields: {
            firstName: {
              active: true,
              filtering: true,
              validating: true,
              filtered: true,
              validated: true,
              valid: true,
              error: 'Uh oh!',
              validValue: 'John',
              value: 'John'
            }
          }
        }
      });

      expect(wrappedProps.fields.firstName).to.have.property('active', true);
      expect(wrappedProps.fields.firstName).to.have.property('filtering', true);
      expect(wrappedProps.fields.firstName).to.have.property('validating', true);
      expect(wrappedProps.fields.firstName).to.have.property('filtered', true);
      expect(wrappedProps.fields.firstName).to.have.property('validated', true);
      expect(wrappedProps.fields.firstName).to.have.property('valid', true);
      expect(wrappedProps.fields.firstName).to.have.property('validValue', 'John');
      expect(wrappedProps.fields.firstName).to.have.property('error', 'Uh oh!');
      expect(wrappedProps.fields.firstName).to.have.property('value', 'John');

    });

    it('should set calculated property .valid to true when all fields are valid', () => {

      const wrappedProps = wrapFormProps({
        fieldNames: ['firstName', 'lastName'],
        props: {
          fields: {
            firstName: {
              valid: true
            },
            lastName: {
              valid: true
            }
          }
        }
      });

      expect(wrappedProps).to.have.property('valid', true);

    });

    it('should set calculated property .valid to false when one or more fields are invalid', () => {

      const wrappedProps = wrapFormProps({
        fieldNames: ['firstName', 'lastName'],
        props: {
          fields: {
            firstName: {
              valid: true
            },
            lastName: {
              valid: false
            }
          }
        }
      });

      expect(wrappedProps).to.have.property('valid', false);

    });

    it('should set calculated property .filtering/.validating to true when one or more fields are filtering/validating', () => {

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

      expect(wrappedProps).to.have.property('filtering', true);
      expect(wrappedProps).to.have.property('validating', true);

    });

    it('should set calculated property .filtering/.validating to true when none of the fields are filtering/validating', () => {

      const wrappedProps = wrapFormProps({
        fieldNames: ['firstName', 'lastName'],
        props: {
          fields: {
            firstName: {},
            lastName: {}
          }
        }
      });

      expect(wrappedProps).to.have.property('filtering', false);
      expect(wrappedProps).to.have.property('validating', false);

    });

    it('should set calculated property .name', () => {

      const wrappedProps = wrapFormProps({
        fieldNames: ['firstName', 'lastName'],
        props: {}
      });

      expect(wrappedProps.fields.firstName).to.have.property('name', 'firstName');
      expect(wrappedProps.fields.lastName).to.have.property('name', 'lastName');

    });

    it('should set calculated property .value/.checked when the value is undefined', () => {

      const wrappedProps = wrapFormProps({
        fieldNames: ['firstName', 'lastName'],
        props: {
          fields: {
            firstName: {},
            lastName: {}
          }
        }
      });

      expect(wrappedProps.fields.firstName).to.have.property('value', '');
      expect(wrappedProps.fields.firstName).to.have.property('checked', false);

      expect(wrappedProps.fields.lastName).to.have.property('value', '');
      expect(wrappedProps.fields.lastName).to.have.property('checked', false);

    });

    it('should set calculated property .value/.checked from the initial value when the value is undefined', () => {

      const wrappedProps = wrapFormProps({
        fieldNames: ['firstName', 'lastName'],
        props: {
          fields: {
            firstName: {
            },
            lastName: {
            }
          }
        },
        initialValues: {
          firstName: 'John',
          lastName: 'Smith'
        }
      });

      expect(wrappedProps.fields.firstName).to.have.property('value', 'John');
      expect(wrappedProps.fields.firstName).to.have.property('checked', true);

      expect(wrappedProps.fields.lastName).to.have.property('value', 'Smith');
      expect(wrappedProps.fields.lastName).to.have.property('checked', true);

    });

    it('should set calculated property .value/.checked when the value is defined', () => {

      const wrappedProps = wrapFormProps({
        fieldNames: ['firstName', 'lastName'],
        props: {
          fields: {
            firstName: {
              value: 'Bob'
            },
            lastName: {
              value: 'Brown'
            }
          }
        },
        initialValues: {
          firstName: 'John',
          lastName: 'Smith'
        }
      });

      expect(wrappedProps.fields.firstName).to.have.property('value', 'Bob');
      expect(wrappedProps.fields.lastName).to.have.property('checked', true);

      expect(wrappedProps.fields.lastName).to.have.property('value', 'Brown');
      expect(wrappedProps.fields.lastName).to.have.property('checked', true);

    });

    it('should merge actions', () => {

      const blur = () => {/* do nothing */};
      const wrappedProps = wrapFormProps({
        fieldNames: ['firstName', 'lastName'],
        props: {},
        actions: {
          blur: blur
        }
      });

      expect(wrappedProps).to.have.property('blur', blur);

    });

  });

  describe('=> when .formPropKey is not empty', () => {

    it('should set default form properties when no properties are set', () => {

      const wrappedProps = wrapFormProps({
        formPropKey: 'form',
        fieldNames: [],
        props: {}
      });

      expect(wrappedProps.form).to.have.property('fields');
      expect(wrappedProps.form).to.have.property('submitting', false);
      expect(wrappedProps.form).to.have.property('submitted', false);
      expect(wrappedProps.form).to.have.property('error', '');

    });

    it('should not set default form properties when properties are set', () => {

      const wrappedProps = wrapFormProps({
        formPropKey: 'form',
        fieldNames: [],
        props: {
          form: {
            fields: {},
            submitting: true,
            submitted: true,
            error: 'Uh oh!'
          }
        }
      });

      expect(wrappedProps.form).to.have.property('fields');
      expect(wrappedProps.form).to.have.property('submitting', true);
      expect(wrappedProps.form).to.have.property('submitted', true);
      expect(wrappedProps.form).to.have.property('error', 'Uh oh!');

    });

    it('should set default field properties when no properties are set', () => {

      const wrappedProps = wrapFormProps({
        formPropKey: 'form',
        fieldNames: ['firstName'],
        props: {}
      });

      expect(wrappedProps.form.fields.firstName).to.have.property('active', false);
      expect(wrappedProps.form.fields.firstName).to.have.property('filtering', false);
      expect(wrappedProps.form.fields.firstName).to.have.property('validating', false);
      expect(wrappedProps.form.fields.firstName).to.have.property('filtered', false);
      expect(wrappedProps.form.fields.firstName).to.have.property('validated', false);
      expect(wrappedProps.form.fields.firstName).to.have.property('valid', false);
      expect(wrappedProps.form.fields.firstName).to.have.property('validValue', '');
      expect(wrappedProps.form.fields.firstName).to.have.property('error', '');

    });

    it('should not set default field properties when properties are set', () => {

      const wrappedProps = wrapFormProps({
        formPropKey: 'form',
        fieldNames: ['firstName'],
        props: {
          form: {
            fields: {
              firstName: {
                active: true,
                filtering: true,
                validating: true,
                filtered: true,
                validated: true,
                valid: true,
                error: 'Uh oh!',
                validValue: 'John',
                value: 'John'
              }
            }
          }
        }
      });

      expect(wrappedProps.form.fields.firstName).to.have.property('active', true);
      expect(wrappedProps.form.fields.firstName).to.have.property('filtering', true);
      expect(wrappedProps.form.fields.firstName).to.have.property('validating', true);
      expect(wrappedProps.form.fields.firstName).to.have.property('filtered', true);
      expect(wrappedProps.form.fields.firstName).to.have.property('validated', true);
      expect(wrappedProps.form.fields.firstName).to.have.property('valid', true);
      expect(wrappedProps.form.fields.firstName).to.have.property('validValue', 'John');
      expect(wrappedProps.form.fields.firstName).to.have.property('error', 'Uh oh!');
      expect(wrappedProps.form.fields.firstName).to.have.property('value', 'John');

    });

    it('should set calculated property .valid to true when all fields are valid', () => {

      const wrappedProps = wrapFormProps({
        formPropKey: 'form',
        fieldNames: ['firstName', 'lastName'],
        props: {
          form: {
            fields: {
              firstName: {
                valid: true
              },
              lastName: {
                valid: true
              }
            }
          }
        }
      });

      expect(wrappedProps.form).to.have.property('valid', true);

    });

    it('should set calculated property .valid to false when one or more fields are invalid', () => {

      const wrappedProps = wrapFormProps({
        formPropKey: 'form',
        fieldNames: ['firstName', 'lastName'],
        props: {
          form: {
            fields: {
              firstName: {
                valid: true
              },
              lastName: {
                valid: false
              }
            }
          }
        }
      });

      expect(wrappedProps.form).to.have.property('valid', false);

    });

    it('should set calculated property .filtering/.validating to true when one or more fields are filtering/validating', () => {

      const wrappedProps = wrapFormProps({
        formPropKey: 'form',
        fieldNames: ['firstName', 'lastName'],
        props: {
          form: {
            fields: {
              firstName: {
                validating: true
              },
              lastName: {
                filtering: true
              }
            }
          }
        }
      });

      expect(wrappedProps.form).to.have.property('filtering', true);
      expect(wrappedProps.form).to.have.property('validating', true);

    });

    it('should set calculated property .filtering/.validating to true when none of the fields are filtering/validating', () => {

      const wrappedProps = wrapFormProps({
        formPropKey: 'form',
        fieldNames: ['firstName', 'lastName'],
        props: {
          form: {
            fields: {
              firstName: {},
              lastName: {}
            }
          }
        }
      });

      expect(wrappedProps.form).to.have.property('filtering', false);
      expect(wrappedProps.form).to.have.property('validating', false);

    });

    it('should set calculated property .name', () => {

      const wrappedProps = wrapFormProps({
        formPropKey: 'form',
        fieldNames: ['firstName', 'lastName'],
        props: {}
      });

      expect(wrappedProps.form.fields.firstName).to.have.property('name', 'firstName');
      expect(wrappedProps.form.fields.lastName).to.have.property('name', 'lastName');

    });

    it('should set calculated property .value/.checked when the value is undefined', () => {

      const wrappedProps = wrapFormProps({
        formPropKey: 'form',
        fieldNames: ['firstName', 'lastName'],
        props: {
          form: {
            fields: {
              firstName: {},
              lastName: {}
            }
          }
        }
      });

      expect(wrappedProps.form.fields.firstName).to.have.property('value', '');
      expect(wrappedProps.form.fields.firstName).to.have.property('checked', false);

      expect(wrappedProps.form.fields.lastName).to.have.property('value', '');
      expect(wrappedProps.form.fields.lastName).to.have.property('checked', false);

    });

    it('should set calculated property .value/.checked from the initial value when the value is undefined', () => {

      const wrappedProps = wrapFormProps({
        formPropKey: 'form',
        fieldNames: ['firstName', 'lastName'],
        props: {
          fields: {
            firstName: {
            },
            lastName: {
            }
          }
        },
        initialValues: {
          firstName: 'John',
          lastName: 'Smith'
        }
      });

      expect(wrappedProps.form.fields.firstName).to.have.property('value', 'John');
      expect(wrappedProps.form.fields.firstName).to.have.property('checked', true);

      expect(wrappedProps.form.fields.lastName).to.have.property('value', 'Smith');
      expect(wrappedProps.form.fields.lastName).to.have.property('checked', true);

    });

    it('should set calculated property .value/.checked when the value is defined', () => {

      const wrappedProps = wrapFormProps({
        formPropKey: 'form',
        fieldNames: ['firstName', 'lastName'],
        props: {
          form: {
            fields: {
              firstName: {
                value: 'Bob'
              },
              lastName: {
                value: 'Brown'
              }
            }
          }
        },
        initialValues: {
          firstName: 'John',
          lastName: 'Smith'
        }
      });

      expect(wrappedProps.form.fields.firstName).to.have.property('value', 'Bob');
      expect(wrappedProps.form.fields.lastName).to.have.property('checked', true);

      expect(wrappedProps.form.fields.lastName).to.have.property('value', 'Brown');
      expect(wrappedProps.form.fields.lastName).to.have.property('checked', true);

    });

    it('should merge actions', () => {

      const blur = () => {/* do nothing */};
      const wrappedProps = wrapFormProps({
        formPropKey: 'form',
        fieldNames: ['firstName', 'lastName'],
        props: {},
        actions: {
          blur: blur
        }
      });

      expect(wrappedProps.form).to.have.property('blur', blur);

    });

  });

});