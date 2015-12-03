
import {
  FOCUS, BLUR, CHANGE,
  FILTER, VALIDATE, SUBMIT
} from '../lib/constants';

import {
  focus, blur, change,
  filter, validate, submit
} from '../lib/actions';

const FORM = 'profile';
const FIELD = 'firstName';

describe('actions', () => {

  describe('focus()', () => {

    it('should return an action', () => {

      const action = focus(FORM, FIELD);

      expect(action).to.be.deep.equal({
        type: FOCUS,
        meta: {
          form: FORM,
          field: FIELD
        }
      });

    });

  });

  describe('blur()', () => {

    it('should return an action', () => {

      const action = blur(FORM, FIELD);

      expect(action).to.be.deep.equal({
        type: BLUR,
        meta: {
          form: FORM,
          field: FIELD
        }
      });

    });

  });

  describe('change()', () => {

    it('should return an action', () => {

      const action = change(FORM, FIELD, 'John');

      expect(action).to.be.deep.equal({
        type: CHANGE,
        payload: 'John',
        meta: {
          form: FORM,
          field: FIELD
        }
      });

    });

  });

  describe('filter()', () => {

    describe('=> synchronous', () => {

      it('should call the fn', () => {

        const fn = sinon.stub().returns('John');
        const dispatch = sinon.spy();

        filter(FORM, FIELD, 'John', {}, fn)(dispatch);

        expect(fn).to.be.calledOnce;

      });

      it('should return an action with a filtered value', () => {

        const dispatch = sinon.spy();

        filter(FORM, FIELD, ' John ', {}, ({value}) => value.trim())(dispatch);

        expect(dispatch).to.be.calledWith({
          type: FILTER,
          status: 'finished',
          payload: 'John',
          meta: {
            form: FORM,
            field: FIELD
          }
        });

      });

    });

    describe('=> asynchronous', () => {
      it('should...')
    });

  });

  describe('validate()', () => {

    describe('=> synchronous', () => {

      it('should call the fn', () => {

        const fn = sinon.stub().returns(true);
        const dispatch = sinon.spy();

        validate(FORM, FIELD, 'John', {}, fn)(dispatch);

        expect(fn).to.be.calledOnce;

      });

      it('should return an action with a valid result', () => {

        const dispatch = sinon.spy();

        validate(FORM, FIELD, 'John', {}, () => true)(dispatch);

        expect(dispatch).to.be.calledWith({
          type: VALIDATE,
          status: 'finished',
          payload: true,
          meta: {
            form: FORM,
            field: FIELD
          }
        });

      });

      it('should return an action with an invalid result', () => {

        const dispatch = sinon.spy();

        validate(FORM, FIELD, 'John', {}, () => 'Error!')(dispatch);

        expect(dispatch).to.be.calledWith({
          type: VALIDATE,
          status: 'finished',
          payload: 'Error!',
          meta: {
            form: FORM,
            field: FIELD
          }
        });

      });

    });

    describe('=> asynchronous', () => {
      it('should...')
    });

  });

});