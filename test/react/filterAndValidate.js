import filterAndValidate from '../../src/react/filterAndValidate';

describe('filterAndValidate()', () => {

  it('should not call the filter action when filter=false', () => {

    const filterAction = sinon.stub().returns(Promise.resolve(''));

    return filterAndValidate({

      field: 'name',

      filter: false,
      filterAction

    })
      .then(() => expect(filterAction).to.not.be.called)
    ;

  });

  it('should not call the validate action when validate=false', () => {

    const validateAction = sinon.stub().returns(Promise.resolve());

    return filterAndValidate({

      field: 'name',

      validate: false,
      validateAction

    })
      .then(() => expect(validateAction).to.not.be.called)
    ;

  });

  it('should return false when filter=false and validate=false', () => {

    return filterAndValidate({
      field: 'name'
    })
      .then(valid => expect(valid).to.be.false)
    ;

  });

  describe('=> when filter=true', () => {

    it('should call the filter action', () => {

      const filterFn = () => {/*do nothing*/};
      const filterAction = sinon.stub().returns(Promise.resolve(''));

      return filterAndValidate({

        field: 'name',

        filter: true,
        filterFn,
        filterAction
      })
        .then(() => expect(filterAction).to.be.calledWith('name', filterFn))
      ;

    });

    it('should return false', () => {

      const filterAction = sinon.stub().returns(Promise.resolve(''));

      return filterAndValidate({

        field: 'name',

        filter: true,
        filterFn: () => {/*do nothing*/},
        filterAction

      })
        .then(valid => expect(valid).to.be.false)
      ;

    });

  });

  describe('=> when validate=true', () => {

    it('should call the validate action', () => {

      const validateFn = () => true;
      const validateAction = sinon.stub().returns(Promise.resolve());

      return filterAndValidate({

        field: 'name',

        validate: true,
        validateFn,
        validateAction,
        afterValidate: () => {/*do nothing*/},

        component: {form: {fields: {name: {value: 'John', lastValidValue: 'Jo'}}}}

      })
        .then(() => expect(validateAction).to.be.calledWith('name', validateFn))
      ;

    });

    it('should return false when invalid', () => {

      return filterAndValidate({

        field: 'name',

        validate: true,
        validateFn: () => false,
        validateAction: sinon.stub().returns(Promise.resolve(false)),
        afterValidate: () => {/*do nothing*/},

        component: {form: {fields: {name: {value: 'John', lastValidValue: 'Jo'}}}}

      })
        .then(valid => expect(valid).to.be.false)
      ;

    });

    it('should return true when valid', () => {

      return filterAndValidate({

        field: 'name',

        validate: true,
        validateFn: () => true,
        validateAction: sinon.stub().returns(Promise.resolve(true)),
        afterValidate: () => {/*do nothing*/},

        component: {form: {fields: {name: {value: 'John', lastValidValue: 'Jo'}}}}

      })
        .then(valid => expect(valid).to.be.true)
      ;

    });

    it('should call afterValidate()', () => {

      const afterValidate = sinon.spy();

      return filterAndValidate({

        field: 'name',

        validate: true,
        validateFn: () => true,
        validateAction: sinon.stub().returns(Promise.resolve(true)),
        afterValidate,

        component: {form: {fields: {name: {value: 'John', lastValidValue: 'Jo'}}}}

      })
        .then(() => expect(afterValidate).to.be.calledWith({
          valid: true,
          field: 'name',
          value: 'John',
          values: {name: 'Jo'},
          dispatch: undefined
        }))
      ;

    });

  });

  describe('=> when filter=true and validate=true', () => {

    it('should call the filter action', () => {

      const filterFn = () => {/*do nothing*/};
      const filterAction = sinon.stub().returns(Promise.resolve('John'));

      return filterAndValidate({

        field: 'name',

        filter: true,
        filterFn,
        filterAction,

        validate: true,
        validateFn: () => {/*do nothing*/},
        validateAction: sinon.stub().returns(Promise.resolve('')),
        afterValidate: () => {/*do nothing*/},

        component: {form: {fields: {name: {value: 'John', lastValidValue: 'Jo'}}}}

      })
        .then(() => expect(filterAction).to.be.calledWith('name', filterFn))
      ;

    });

    it('should call the validate action', () => {

      const validateFn = () => true;
      const validateAction = sinon.stub().returns(Promise.resolve());

      return filterAndValidate({

        field: 'name',

        filter: true,
        filterFn: () => {/*do nothing*/},
        filterAction: sinon.stub().returns(Promise.resolve('John')),

        validate: true,
        validateFn,
        validateAction,
        afterValidate: () => {/*do nothing*/},

        component: {form: {fields: {name: {value: 'John', lastValidValue: 'Jo'}}}}

      })
        .then(() => {
          expect(validateAction).to.be.calledWith('name', validateFn);
        })
      ;

    });

    it('should return false when invalid', () => {

      return filterAndValidate({

        field: 'name',

        filter: true,
        filterFn: () => {/*do nothing*/},
        filterAction: sinon.stub().returns(Promise.resolve('John')),

        validate: true,
        validateFn: () => false,
        validateAction: sinon.stub().returns(Promise.resolve(false)),
        afterValidate: () => {/*do nothing*/},

        component: {form: {fields: {name: {value: 'John', lastValidValue: 'Jo'}}}}

      })
        .then(valid => {
          expect(valid).to.be.false;
        })
      ;

    });

    it('should return true when valid', () => {

      return filterAndValidate({

        field: 'name',

        filter: true,
        filterFn: () => {/*do nothing*/},
        filterAction: sinon.stub().returns(Promise.resolve('John')),

        validate: true,
        validateFn: () => true,
        validateAction: sinon.stub().returns(Promise.resolve(true)),
        afterValidate: () => {/*do nothing*/},

        component: {form: {fields: {name: {value: 'John', lastValidValue: 'Jo'}}}}

      })
        .then(valid => {
          expect(valid).to.be.true;
        })
      ;

    });

    it('should call afterValidate() when invalid', () => {

      const afterValidate = sinon.spy();

      return filterAndValidate({

        field: 'name',

        filter: true,
        filterFn: () => {/*do nothing*/},
        filterAction: sinon.stub().returns(Promise.resolve('John')),

        validate: true,
        validateFn: () => false,
        validateAction: sinon.stub().returns(Promise.resolve(false)),
        afterValidate,

        component: {form: {fields: {name: {value: 'John', lastValidValue: 'Jo'}}}}

      })
        .then(() => {
          expect(afterValidate).to.be.calledWith({
            valid: false,
            field: 'name',
            value: 'John',
            values: {name: 'Jo'},
            dispatch: undefined
          });
        })
      ;

    });

    it('should call afterValidate() with valid value when valid', () => {

      const afterValidate = sinon.spy();

      return filterAndValidate({

        field: 'name',

        filter: true,
        filterFn: () => {/*do nothing*/},
        filterAction: sinon.stub().returns(Promise.resolve('Jo')),

        validate: true,
        validateFn: () => true,
        validateAction: sinon.stub().returns(Promise.resolve(true)),
        afterValidate,

        component: {form: {fields: {name: {value: 'John', lastValidValue: 'Jo'}}}}

      })
        .then(() => {
          expect(afterValidate).to.be.calledWith({
            valid: true,
            field: 'name',
            value: 'John',
            values: {name: 'Jo'},
            dispatch: undefined
          });
        })
      ;

    });

  });

});
