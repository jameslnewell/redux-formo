import filterAndValidate from '../../src/react/filterAndValidate';

describe('filterAndValidate()', () => {

  it('should not call the filter action when filter=false', () => {

    const filterAction = sinon.stub().returns(Promise.resolve(''));

    return filterAndValidate({

      field: 'name',
      value: 'John',
      values: {},

      filter: false,
      filterAction

    })
      .then(() => {
        expect(filterAction).to.not.be.called;
      })
    ;

  });

  it('should not call the validate action when validate=false', () => {

    const validateAction = sinon.stub().returns(Promise.resolve());

    return filterAndValidate({

      field: 'name',
      value: 'John',
      values: {},

      validate: false,
      validateAction

    })
      .then(() => {
        expect(validateAction).to.not.be.called;
      })
    ;

  });

  it('should return false when filter=false and validate=false', () => {

    return filterAndValidate({

      field: 'name',
      value: 'John',
      values: {}

    })
      .then(valid => {
        expect(valid).to.be.false;
      })
      ;

  });

  describe('=> when filter=true', () => {

    it('should call the filter action', () => {

      const filterFn = () => {/*do nothing*/};
      const filterAction = sinon.stub().returns(Promise.resolve(''));

      return filterAndValidate({

        field: 'name',
        value: 'John',
        values: {},

        filter: true,
        filterFn,
        filterAction
      })
        .then(() => {
          expect(filterAction).to.be.calledWith('name', 'John', {}, filterFn);
        })
      ;

    });

    it('should return false', () => {

      const filterAction = sinon.stub().returns(Promise.resolve(''));

      return filterAndValidate({

        field: 'name',
        value: 'John',
        values: {},

        filter: true,
        filterFn: () => {/*do nothing*/},
        filterAction

      })
        .then(valid => {
          expect(valid).to.be.false;
        })
      ;

    });

  });

  describe('=> when validate=true', () => {

    it('should call the validate action', () => {

      const validateFn = () => true;
      const validateAction = sinon.stub().returns(Promise.resolve());

      return filterAndValidate({

        field: 'name',
        value: 'John',
        values: {},

        validate: true,
        validateFn,
        validateAction,
        afterValidate: () => {/*do nothing*/}

      })
        .then(() => {
          expect(validateAction).to.be.calledWith('name', 'John', {}, validateFn);
        })
      ;

    });

    it('should return false when invalid', () => {

      return filterAndValidate({

        field: 'name',
        value: 'John',
        values: {},

        validate: true,
        validateFn: () => false,
        validateAction: sinon.stub().returns(Promise.resolve(false)),
        afterValidate: () => {/*do nothing*/}

      })
        .then(valid => {
          expect(valid).to.be.false;
        })
      ;

    });

    it('should return true when valid', () => {

      return filterAndValidate({

        field: 'name',
        value: 'John',
        values: {},

        validate: true,
        validateFn: () => true,
        validateAction: sinon.stub().returns(Promise.resolve(true)),
        afterValidate: () => {/*do nothing*/}

      })
        .then(valid => {
          expect(valid).to.be.true;
        })
      ;

    });

    it('should call afterValidate()', () => {

      const afterValidate = sinon.spy();

      return filterAndValidate({

        field: 'name',
        value: 'John',
        values: {},

        validate: true,
        validateFn: () => true,
        validateAction: sinon.stub().returns(Promise.resolve(true)),
        afterValidate

      })
        .then(valid => {
          expect(afterValidate).to.be.calledWith({
            valid: true,
            field: 'name',
            value: 'John',
            values: {name: 'John'},
            dispatch: undefined
          });
        })
      ;

    });

  });

  describe('=> when filter=true and validate=true', () => {

    it('should call the filter action', () => {

    });

    it('should call the validate action', () => {

      const validateFn = () => true;
      const validateAction = sinon.stub().returns(Promise.resolve());

      return filterAndValidate({

        field: 'name',
        value: 'John',
        values: {},

        filter: true,
        filterFn: () => {/*do nothing*/},
        filterAction: sinon.stub().returns(Promise.resolve('John')),

        validate: true,
        validateFn,
        validateAction,
        afterValidate: () => {/*do nothing*/}

      })
        .then(() => {
          expect(validateAction).to.be.calledWith('name', 'John', {}, validateFn);
        })
      ;

    });

    it('should return false when invalid', () => {

      return filterAndValidate({

        field: 'name',
        value: 'John',
        values: {},

        filter: true,
        filterFn: () => {/*do nothing*/},
        filterAction: sinon.stub().returns(Promise.resolve('John')),

        validate: true,
        validateFn: () => false,
        validateAction: sinon.stub().returns(Promise.resolve(false)),
        afterValidate: () => {/*do nothing*/}

      })
        .then(valid => {
          expect(valid).to.be.false;
        })
      ;

    });

    it('should return true when valid', () => {

      return filterAndValidate({

        field: 'name',
        value: 'John',
        values: {},

        filter: true,
        filterFn: () => {/*do nothing*/},
        filterAction: sinon.stub().returns(Promise.resolve('John')),

        validate: true,
        validateFn: () => true,
        validateAction: sinon.stub().returns(Promise.resolve(true)),
        afterValidate: () => {/*do nothing*/}

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
        value: 'John',
        values: {},

        filter: true,
        filterFn: () => {/*do nothing*/},
        filterAction: sinon.stub().returns(Promise.resolve('Jo')),

        validate: true,
        validateFn: () => false,
        validateAction: sinon.stub().returns(Promise.resolve(false)),
        afterValidate

      })
        .then(valid => {
          expect(afterValidate).to.be.calledWith({
            valid: false,
            field: 'name',
            value: 'Jo',
            values: {},
            dispatch: undefined
          });
        })
      ;

    });

    it('should call afterValidate() with valid value when valid', () => {

      const afterValidate = sinon.spy();

      return filterAndValidate({

        field: 'name',
        value: 'John',
        values: {},

        filter: true,
        filterFn: () => {/*do nothing*/},
        filterAction: sinon.stub().returns(Promise.resolve('John')),

        validate: true,
        validateFn: () => true,
        validateAction: sinon.stub().returns(Promise.resolve(true)),
        afterValidate

      })
        .then(valid => {
          expect(afterValidate).to.be.calledWith({
            valid: true,
            field: 'name',
            value: 'John',
            values: {name: 'John'},
            dispatch: undefined
          });
        })
      ;

    });

  });

});