import decorateFormProps from '../../src/react/decorateFormProps';

describe('decorateFormProps()', () => {

  describe('=> when .formPropKey is empty', () => {

    it('should merge formHandlers', () => {

      const onSubmit = () => {};
      const props = decorateFormProps({
        formPropKey: '',
        props: {
          submitting: false,
          submitted: true,
          fields: {}
        },
        formHandlers: {
          onSubmit: onSubmit
        },
        fieldHandlers: {}
      });

      expect(props).to.have.property('onSubmit', onSubmit);

    });

    it('should merge fieldHandlers', () => {

      const onChange = () => {};
      const props = decorateFormProps({
        formPropKey: '',
        props: {
          fields: {
            firstName: {
              active: false,
              value: 'John'
            }
          }
        },
        formHandlers: {},
        fieldHandlers: {
          firstName: {
            onChange: onChange
          }
        }
      });

      expect(props.fields.firstName).to.have.property('onChange', onChange);

    });

  });

  describe('=> when .formPropKey is not empty', () => {

    it('should merge formHandlers', () => {

      const onSubmit = () => {};
      const props = decorateFormProps({
        formPropKey: 'form',
        props: {
          form: {
            submitting: false,
            submitted: true,
            fields: {}
          }
        },
        formHandlers: {
          onSubmit: onSubmit
        },
        fieldHandlers: {}
      });

      expect(props.form).to.have.property('onSubmit', onSubmit);

    });

    it('should merge fieldHandlers', () => {

      const onChange = () => {};
      const props = decorateFormProps({
        formPropKey: 'form',
        props: {
          form: {
            fields: {
              firstName: {
                active: false,
                value: 'John'
              }
            }
          }
        },
        formHandlers: {},
        fieldHandlers: {
          firstName: {
            onChange: onChange
          }
        }
      });

      expect(props.form.fields.firstName).to.have.property('onChange', onChange);

    });

  });

});